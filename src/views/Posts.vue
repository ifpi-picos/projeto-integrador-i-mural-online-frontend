<template>
  <b-container fluid>
    <div class="d-flex justify-content-center">
      <div class="col-6 col-ls-1 py-4">
        <form id="form-notice">
          <input
            class="input ocult"
            id="title"
            placeholder="Título"
            v-model="formCreateNotice.title"
            type="text"
            required
          />
          <textarea
            class="input"
            id="description"
            placeholder="Criar uma nova Notícia"
            v-model="formCreateNotice.description"
            @input="autoResize"
            required
          ></textarea>
          <b-form-select class="input ocult" v-model="formCreateNotice.category" :options="categories">
      
          </b-form-select>

          <div class="ocult">
            <div class="d-flex justify-content-end">
              <button @click.prevent="createNotice()">
                <b-icon-plus></b-icon-plus>criar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="noticeList.length" class="d-flex flex-wrap">
      <div v-for="(notice, index) in noticeList" :key="index" class="col-lg-3 col-md-6 col-ls-1">
        <Notice 
          editable
          :title="notice.title" 
          :category="notice.category" 
          :description="notice.description"
          :id="notice.id"
          @delete="deleteNotice(notice.id)"
          @update="setValuesToUpdate(notice)"
        ></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice 
          title="Sem Noticias" 
          description="Você ainda não postou nada"
          disabled
        ></Notice>
      </div>
    </div>
    <b-modal 
        id="updateNoticeModal" title="Atualizar esta postagem" 
        ref="updateNoticeModal" hide-footer
      >        
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Título"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="formUpdateNotice.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Descrição" label-for="description">
            <b-form-textarea
              id="description"
              v-model="formUpdateNotice.description"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group class="text-center">
            <b-button @click.prevent="updateNotice()" variant="primary">Enviar</b-button>
          </b-form-group>
        </b-form>
    </b-modal>
  </b-container>
</template>
<script>
import axios from '../services/axios'
import { mapGetters } from 'vuex'
import { categories } from '@/assets/Categories.json'
import Notice from '@/components/Notice.vue'
export default {
  name: 'posts',
  components: {Notice },
  data(){
    return {
      categories,
      noticeIdToEdit: null,
      noticeList: [],
      formCreateNotice: {
        userId: '',
        title: '',
        description: '',
        category: '',
      },
      formUpdateNotice: {
        userId: '',
        title: '',
        description: '',
        category: '',
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['userAuthenticated']),
  },
  mounted(){
    const uid = this.userAuthenticated.id
    this.formCreateNotice.userId = uid
    this.getNoticeList(uid)
    console.log(categories)
  },
  methods: {
    autoResize(e) {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    getNoticeList(id){
      axios.get(`notices/getByUser/${id}`).then(
        resp=>{
          this.noticeList = resp.data
        },
        error=>{
          console.log({ ...error })
        }
      )
    },
    createNotice(){
      axios.post('notices', this.formCreateNotice).then(
        () => {
          this.$swal({
            text: 'Postagem cadastrada com sucesso!',
            icon: 'sucess',
            timer: '1900'
          }) 
          this.formCreateNotice.title = "";
          this.formCreateNotice.description = "";
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
    updateNotice(){
      axios.put(`notices/${this.noticeIdToEdit}`, this.formUpdateNotice).then(
        () => {
          this.$swal({
            text: 'Postagem atualizada com sucesso!',
            icon: 'sucess',
            confirmButtonText: 'Ok'
          })
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
    deleteNotice(id){
      axios.delete(`notices/${id}`).then(
        ()=>{
          this.$swal({
            title: 'Sucesso',
            text: 'Noticia deletada com sucesso',
            icon: 'sucess',
            timer: '1800'
          })
          this.getNoticeList(this.userAuthenticated.id)
        },
        error=>{
          console.log({...error})
        }
      )
    },
    setValuesToUpdate(notice){
      this.noticeIdToEdit = notice.id
      this.formUpdateNotice.title = notice.title
      this.formUpdateNotice.description = notice.description
      this.formUpdateNotice.userId = notice.userId
    },
  },
}
</script>
<style scoped>
#form-notice {
  background-color: white;
  padding: 8px;
  box-shadow: 
    0 0 5px rgba(11, 11, 19, 0.4),
    0 0 6px rgba(11, 11, 19, 0.3),
    0 0 8px rgba(11, 11, 19, 0.2);
}
#form-notice, .input {
  border-radius: 5px;
}
#form-notice textarea {
  resize: none;
  overflow: hidden;
}
#form-notice:hover .ocult {
  display: block;
}
#form-notice .input {
  width: 100%;
  border: none;
  outline: none;
}
#form-notice .ocult {
  display: none;
}
#form-notice button {
  background-color: transparent;
  border: none;
  border-radius: 50%;
}
</style>