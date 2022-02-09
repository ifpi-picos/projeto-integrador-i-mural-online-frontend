<template>
  <b-container fluid>
    <b-nav-form>
      <b-form-input 
        size="sm" 
        class="mr-sm-2 mt-2 ml-3" 
        placeholder="Pesquisar Avisos"
        v-model="search"
      ></b-form-input>

      <b-form-select
        size="sm"
        class="ml-2 mt-2"
        :options="categories"
        v-model="searchCategory"
      ></b-form-select>
      <b-button size="sm" class="mt-2 ml-2 btn-danger btn-sm" title="Limpar" btnv-b-tooltip.hover @click="LimparFiltro">
        <b-icon-brush></b-icon-brush>
      </b-button>
    </b-nav-form>
    <div v-if="itemsFiltered.length" class="d-flex flex-wrap pt-1">
      <div v-for="(notice, index) in itemsFiltered" :key="index" class="col-lg-3 col-md-6 col-ls-1 py-4">
        <Notice 
          :disabledSaveButton="disabledSaveButton"
          :notice="notice"
          :hasSaved="notice.hasSaved"
          @save="saveNotice(notice.id, index)"
          @unsave="unSaveNotice(notice.id, index)"
          :authenticated="authenticated"
        ></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice
          disabled
        ></Notice>
      </div>
    </div>
  </b-container>
</template>
<script>
import axios from '@/services/axios.js'
import Notice from '@/components/Notice.vue'
import { categories } from '@/assets/Categories.json'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Notice
  },
  data(){
    return {
      categories,
      noticeList: [],
      search: "",
      searchCategory: "",
      disabledSaveButton: false
    }
  },
  mounted(){
    axios.get('notices').then(
      resp=>{
        this.noticeList = resp.data
      },
      error=>{
        console.log({...error})
      }
    )
  },
  methods: {
    LimparFiltro(){
      this.search = "";
      this.searchCategory = ""
    },
    async saveNotice(noticeId, index){
      this.disabledSaveButton = true;
      this.noticeList[index].hasSaved = true;
      try {
       await axios.post('savedNotices', { noticeId })
      } catch(error) {
        this.$swal.fire('Desculpe ocorreu um erro ao tentar salvar esta publicação', '', 'error')
        console.log(error)
        this.noticeList[index].hasSaved = null;
      }
      this.disabledSaveButton = false;
    },
    async unSaveNotice(noticeId, index){
      this.disabledSaveButton = true;
      const hasSaved = this.noticeList[index].hasSaved
      this.noticeList[index].hasSaved = null;
      try {
        await axios.delete(`savedNotices/${hasSaved.id}`)
      } catch(error) {
        this.$swal.fire('Desculpe ocorreu um erro ao remover esta publicação das salvas', '', 'error')
        console.log(error)
        this.noticeList[index].hasSaved = hasSaved;
      }
      this.disabledSaveButton = false;
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated']),
    itemsFiltered(){
      return this.noticeList.filter((notice )=>{
        return(
          notice.title.toLowerCase().match(this.search.toLowerCase()) && 
          notice.category.toLowerCase().match(this.searchCategory.toLowerCase())
        );
      });  
    }
  }
}
</script>
