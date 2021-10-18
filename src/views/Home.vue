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
          class="ml-2 mt-2"
          :options="categories"
          v-model="searchCategory"
          > <option disabled value=""> Escolha uma categoria</option>  </b-form-select>

       <b-button size="sm" class="mt-2 ml-2" title="Limpar" v-b-tooltip.hover @click="LimparFiltro">
        <b-icon-trash></b-icon-trash>
       </b-button>

        </b-nav-form>
        
    <div v-if="itemsFiltered.length" class="d-flex flex-wrap pt-1">
      <div v-for="(notice, index) in itemsFiltered" :key="index" class="col-lg-3 col-md-6 col-ls-1 py-4">
        <Notice 
          :title="notice.title" 
          :description="notice.description"
          :category="notice.category"
        ></Notice>
      </div>
    </div>
    <div v-else class="d-flex flex-wrap pt-1">
      <div class="col-lg-3 col-md-6 col-ls-1">
        <Notice 
          disabled
          title="Sem Noticias" 
          description="Não há notícias no momento"
        ></Notice>
      </div>
    </div>
  </b-container>
</template>


<script>
import axios from '@/services/axios.js'
import Notice from '@/components/Notice.vue'
import { categories } from '@/assets/Categories.json'
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
      searchCategory: ""
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
    }
  },
  computed: {
    itemsFiltered(){
        let valores = [];

        valores = this.noticeList.filter((notice )=>{
          return(
            notice.title.toLowerCase().match(this.search.toLowerCase()) && 
            notice.category.toLowerCase().match(this.searchCategory.toLowerCase())

          );
        });  

      return valores;
    }
  }
}
</script>