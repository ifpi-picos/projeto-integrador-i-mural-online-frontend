<template>
  <b-container class="users text-center">
    <h1>Lista de Usuários</h1>
    <div v-for="(user, index) in userList" :key="index" class="user d-flex justify-content-around">
      <label class="col-7">{{user.firstName +' '+ user.lastName}}</label>
      <select class="col-5" :value="user.role" @change="(e)=>{updateRole(user.id, e.target.value)}">
        <option value="viewer">viewer</option> 
        <option value="publisher">publisher</option> 
        <option value="admin">admin</option> 
      </select>
    </div>
  </b-container>
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
    getUserList(){
      axios.get(`users/`).then(
        resp=>{
          this.userList = resp.data.filter(user => user.id !== this.userAuthenticated.id)
        },
        error=>{
          console.log({ ...error })
        }
      )
    },
    updateRole(id, role){
      axios.put(`users/role/${id}?role=${role}`)
        .catch(error=>{
          console.log(error)
          this.$swal({
            text: 'Ocorreu um erro inesperado ao mudar a função deste usuário',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },
  },
}
</script>
<style scoped>
.user {
  border-bottom: 1px solid black;
}
.user select {
  background: transparent;
  border: none;
  border-left: 1px solid rgba(0,0,0,0.1);
  outline: none;
  text-align: center;
} 
.user select:hover {
  cursor: pointer;
}
</style>