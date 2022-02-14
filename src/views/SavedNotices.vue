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
      <b-button size="sm" class="mt-2 ml-2 btn-secondary btn-sm" title="Limpar" btnv-b-tooltip.hover @click="LimparFiltro">
        <b-icon-x></b-icon-x>
      </b-button>
    </b-nav-form>
    <div v-if="itemsFiltered.length" class="d-flex flex-wrap pt-1">
      <div v-for="(savedNotice, index) in itemsFiltered" :key="index" class="col-lg-3 col-md-6 col-ls-1 py-4">
        <Notice 
          :disabledSaveButton="disabledSaveButton"
          :notice="savedNotice.notice"
          :hasSaved="true"
          @unsave="unSaveNotice(savedNotice.id, index)"
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
  name: 'SavedNotices',
  components: {
    Notice
  },
  data(){
    return {
      categories,
      savedNotices: [],
      search: "",
      searchCategory: "",
      disabledSaveButton: false
    }
  },
  mounted(){
    axios.get('savedNotices').then(
      resp=>{
        this.savedNotices = resp.data
        console.log(this.savedNotices)
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
    async unSaveNotice(savedNoticeId, index){
      this.disabledSaveButton = true;
      try {
        await axios.delete(`savedNotices/${savedNoticeId}`)
        this.savedNotices.splice(index, 1);
      } catch(error) {
        this.$swal.fire('Desculpe ocorreu um erro ao remover esta publicação das salvas', '', 'error')
      }
      this.disabledSaveButton = false;
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated']),
    itemsFiltered(){
      return this.savedNotices.filter((savedNotice)=>{
        return(
          savedNotice.notice.title.toLowerCase().match(this.search.toLowerCase()) && 
          savedNotice.notice.category.toLowerCase().match(this.searchCategory.toLowerCase())
        );
      });
    }
  }
}
</script>
