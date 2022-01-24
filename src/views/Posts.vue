<template>
  <b-container fluid>
    <form class="col-md-6 col-ls-12 my-4 mx-auto" id="form-notice">
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
      <b-form-select 
        class="input ocult" 
        v-model="formCreateNotice.category" 
        :options="categories"
      ></b-form-select>
      <div class="ocult">
        <SelectColor
          placeholder="cor do fundo" 
          @change="e=>formCreateNotice.backgroundColor = e"
        />
      </div>
      <div class="ocult">
        <SelectColor
          placeholder="cor do texto" 
          @change="e=>formCreateNotice.textColor = e"
        />
      </div>
      <div class="ocult">
        <div class="d-flex justify-content-end">
          <button @click.prevent="createNotice()">
            <b-icon-plus></b-icon-plus>criar
          </button>
        </div>
      </div>
    </form>
    <div v-if="noticeList.length" class="d-flex flex-wrap">
      <div v-for="(notice, index) in noticeList" :key="index" class="col-lg-3 col-md-6 col-ls-1">
        <Notice 
          editable
          :notice="notice" 
          @delete="deleteNotice(notice.id)"
          @update="setValuesToUpdate(notice)"
        ></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice disabled></Notice>
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
              v-model="noticeToUpdate.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Descrição" label-for="description">
            <b-form-textarea
              id="description"
              v-model="noticeToUpdate.description"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group id="input-group-2" label="Categoria" label-for="category">
            <b-form-select 
              class="input ocult" 
              v-model="noticeToUpdate.category" 
              :options="categories"
            ></b-form-select>
          </b-form-group>
          <SelectColor
            placeholder="cor do fundo" 
            @change="e=>noticeToUpdate.backgroundColor = e"
          />
          <SelectColor
            placeholder="cor do texto" 
            @change="e=>noticeToUpdate.textColor = e"
          />
          <b-form-group class="text-center mt-2">
            <b-button 
              @click.prevent="updateNotice()" variant="primary"
              :disabled="disableFormButton"
            >{{disableFormButton ? 'Aguarde': 'Atualizar'}}</b-button>
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
import SelectColor from '@/components/SelectColor.vue'
export default {
  name: 'posts',
  components: { Notice, SelectColor },
  data(){
    return {
      disableFormButton: false,
      noticeList: [],
      categories: [
        { value: null, text: 'selecione uma categoria' },
        ...categories.map(c => ({ value: c, text: c }))
      ],
      formCreateNotice: {
        userId: '',
        title: '',
        description: '',
        category: null,
        textColor: '#000',      
        backgroundColor: '#fff'      
      },
      noticeToUpdate: {
        id: '',
        userId: '',
        title: '',
        description: '',
        category: null,
        textColor: '#000',
        backgroundColor: '#fff'
      },
    }
  },
  computed: {
    ...mapGetters('auth', ['userAuthenticated']),
  },
  mounted(){
    const uid = this.userAuthenticated.id
    this.formCreateNotice.userId = uid
    this.getNoticeList(uid)
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
    async createNotice(){
      this.disableFormButton = true
      try {
        const { data: noticeCreated} = await axios.post('notices', this.formCreateNotice)
        this.$swal({
          text: 'Postagem cadastrada com sucesso!',
          icon: 'success',
          timer: '1900'
        }) 
        this.noticeList.push(noticeCreated)
        this.formCreateNotice.title = "";
        this.formCreateNotice.description = "";
      } catch(error){
        console.log({...error})
          const message = error.response.data.error
          this.$swal({
            title: 'Oops ...',
            text: message,
            icon: 'error',
            timer: '1900'
          }) 
      }
      this.disableFormButton = false
    },
    async updateNotice(){
      this.disableFormButton = true;
      try {
        await axios.put(`notices/${this.noticeToUpdate.id}`, this.noticeToUpdate)
        this.$swal({
          text: 'Postagem atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      } catch(error){
        console.log({...error})
      }
      this.disableFormButton = false;
    },
    deleteNotice(id){
      axios.delete(`notices/${id}`).then(
        ()=>{
          this.$swal({
            title: 'Sucesso',
            text: 'Noticia deletada com sucesso',
            icon: 'success',
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
      this.noticeToUpdate= notice
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
#form-notice textarea {
  resize: none;
  overflow: hidden;
}
#form-notice .input {
  width: 100%;
  border: none;
  outline: none;
}
#form-notice select.input {
  padding-left: 2px;
}
#form-notice select.input:focus {
  outline: none;
  box-shadow: none;
  cursor: pointer;
}
#form-notice select.input:hover {
  cursor: pointer;
}
#form-notice .ocult {
  display: none;
  transition: display 1s;
}
#form-notice:hover .ocult {
  display: block;
}
#form-notice button {
  background-color: transparent;
  border: none;
}
</style>