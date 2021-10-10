<template>
  <div>
    <h1>Lista de Usuários</h1>
    <div v-for="(user, index) in userList" :key="index" class="user">
      <label>{{user.firstName +' '+ user.lastName}}</label>
    </div>
  </div>
</template>

<script>
import axios from '../services/axios'
import { mapGetters } from 'vuex'
export default {
  name: 'admin',
  data(){
    return {
      userList: [],
    }
  },
  computed: {
    ...mapGetters('auth', ['userAuthenticated']),
  },
  mounted(){
    this.getUserList()
  },
  methods: {
    autoResize(e) {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    getUserList(){
      axios.get(`users/`).then(
        resp=>{
          this.userList = resp.data
        },
        error=>{
          console.log({ ...error })
        }
      )
    },
    createNotice(){
      axios.post('notices', this.formCreateNotice).then(
        () => {
          alert('postagem cadastrada com sucesso!')
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
    changeUserType(id, type){
      axios.put(`users/${id}`, { type }).then(
        () => {
          alert('postagem atualizada com sucesso!')
          this.getNoticeList(this.userAuthenticated.id)
        },
        error => {
          console.log({...error})
        }
      )
    },
  },
}
</script>
<style scoped>
.user {
  border: 1px solid black;
}
</style>