<template>
  <div>
    <b-navbar toggleable="lg" class="header">
      <b-navbar-brand class="brand" to="/">
        Mural Online
        <fa-icon icon="thumbtack"></fa-icon>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="ml-auto">
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="userRole && userRole == 'publisher'" to="Postagens">
            <b-icon-plus class="icon"></b-icon-plus>Suas Postagens
          </b-nav-item>
          <b-nav-item v-if="userRole && userRole == 'admin'" to="Admin">
            <b-icon-person-badge class="icon"></b-icon-person-badge> Painel de Administrador
          </b-nav-item>
          <slot v-if="authenticated">
            <b-nav-item-dropdown right >
              <template #button-content>
                <em class="text-light">
                  <b-icon-person-circle class="icon"></b-icon-person-circle> {{ userAuthenticated.email }}
                </em>
              </template>
              <b-dropdown-item to="perfil">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </slot>
          <slot v-else>
            <b-nav-item v-b-modal.loginModal>
              Fazer Login
            </b-nav-item>
            <b-modal id="loginModal" :title="signupInModal? 'Cadastro': 'login'" ref="loginModal" hide-footer>
              <b-form v-if="!signupInModal" @submit.prevent="login()">
                <b-form-group
                  id="input-group-1"
                  label="Email:"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="formSignin.email"
                    type="text"
                    placeholder="Digite Seu Email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Senha" label-for="password">
                  <b-form-input
                    id="password"
                    v-model="formSignin.password"
                    placeholder="Digite a Sua senha"
                    type="password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button type="submit" variant="primary">Login</b-button>
                </b-form-group>
                <div class="text-center">
                  <b-link @click="signupInModal = !signupInModal">ainda não é um usuário? clique aqui para se cadastrar</b-link>
                </div>
              </b-form>
              <b-form v-if="signupInModal" @submit.prevent="register()">
                <b-form-group
                  label="Primeiro Nome: *"
                  label-for="firstName"
                >
                  <b-form-input
                    id="firstName"
                    v-model="formSignup.firstName"
                    type="text"
                    placeholder="Primeiro Nome"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Ultimo Nome: *"
                  label-for="lastName"
                >
                  <b-form-input
                    id="lastName"
                    v-model="formSignup.lastName"
                    type="text"
                    placeholder="Ultimo Nome"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Email: *"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="formSignup.email"
                    type="text"
                    placeholder="Email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Data de Nasciento: *" label-for="birthDate">
                  <b-form-input
                    id="birthDate"
                    type="date"
                    v-model="formSignup.birthDate"
                    placeholder="Data de Nascimento"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Telefone: *" label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="formSignup.phone"
                    placeholder="Telefone"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Senha: *" label-for="password">
                  <b-form-input
                    id="password"
                    v-model="formSignup.password"
                    placeholder="Sua senha"
                    type="password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button type="submit" variant="primary">Cadastrar</b-button>
                </b-form-group>
                <div class="text-center">
                  <b-link @click="signupInModal = !signupInModal">
                    ja é um usuário? clique aqui para fazer login
                  </b-link>
                </div>
              </b-form>
            </b-modal>
          </slot>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LayoutDefalt',
  data(){
    return {
      signupInModal: false,
      formSignin: {
        email: '',
        password: ''
      },
      formSignup: {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'userAuthenticated']),
    userRole() {
      if (this.authenticated){
        return this.userAuthenticated.role
      } else return null
    }
  },
  methods: {
    ...mapActions('auth', ['signIn', 'signUp', 'signOut']),
    closeModal(){
      this.$refs.loginModal.hide()
    },
    login(){
      if (this.formSignin.email === ''){
        alert("Você Deve Preencher o Campo Email")
      } else
      if (this.formSignin.email.indexOf('@') === -1){
        alert("Coloque Um Email Valido")
      } else
      if(this.formSignin.password ===''){
        alert("Você deve Preencher o Campo Senha")
      } else
      this.signIn(this.formSignin).then(
        ()=>{
          alert('usuário logado')
        },
        error=>{
          const message = error.response.data.message
          console.log({...error})
          if(message == 'password incorrect')
            alert('Senha Incorreta')
          if(message == 'User with email not found')
            alert('Usuário não encontrado')
        }
      )
    },
    logout(){
      this.signOut()
      this.$router.push('/').catch(()=>{});
    },
    register(){
      if (this.formSignup.firstName ===''){
        alert("Por Favor Preencha o Campo Nome")
      } else

       if (this.formSignup.lastName ===''){
        alert("Por Favor Preencha o Campo Ultimo Nome")
      } else

       if (this.formSignup.email===''){
        alert("Por Favor Preencha o Campo Email")
      } else

      if (this.formSignup.email.indexOf('@') === -1){
        alert("Por Favor Coloque um Email Valido")
      } else

      if (this.formSignup.birthDate === ''){
        alert("Por favor Preencha o Campo Data de Aniversario");
      } else

      if (this.formSignup.birthDate > new Date().toLocaleDateString() ){
       alert("Data invalida")
      } else

      if (this.formSignup.phone ===''){
        alert("Por Favor Preencha o Campo Telefone")
      } else

      if (this.formSignup.password ===''){
        alert("Por Favor Preencha o Campo Senha")
      } else

      if (this.formSignup.password.length < 6){
        alert("A Sua Senha Deve Ter no Minimo 6 Caracteres")
      } else
      this.signUp(this.formSignup).then(
        () => {
          alert('usuário cadastrado, agora faça login')
          this.signupInModal = false
        },
        error=>{
          console.log({...error})
          const code = error.response.status
          if(code === 409 )
            alert('Este email ja está em uso')
          if(code === 400 )
            alert('Dados Invalidos')
          if(code === 500 )
            alert('Erro no servidor')
        }
      )
    }
  }
}
</script>
<style scoped>
body {
  width: 100%;
}
.header {
  background-color: #004910;
  min-width: 100%;
}

.brand {
  color: #eeeeee;
}

.navbar-light .navbar-nav .nav-link{
  color: #eeeeee;
}

.btn .b-icon.bi, .nav-link .b-icon.bi, .dropdown-toggle .b-icon.bi, .dropdown-item .b-icon.bi, .input-group-text .b-icon.bi{
  color: #eeeeee;
}
</style>