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
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Data de Nascimento: *" label-for="birthDate">
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
        this.$swal({
          title: 'Atenção!',
          text: 'Preencha o campo Email',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else
      if (this.formSignin.email.indexOf('@') === -1){
        this.$swal({
          title: '',
          text: 'O email deve conter @',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else
      if(this.formSignin.password ===''){
        this.$swal({
          title: 'Atenção',
          text: 'Preencha o campo senha',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else
      this.signIn(this.formSignin).then(
        ()=>{
          this.$swal({
            title: 'Tudo certo',
            text: 'Login realizado com sucesso',
            icon: 'success',
            timer: '1700'     
            })
        },
        error=>{
          console.log({...error})
          const message = error.response.data.error
          this.$swal({
            title: 'Ops...',
            text: message,
            icon: 'error',
            timer: '1800'     
          })
        }
      )
    },
    logout(){
      this.$swal({
        title: 'Sair',
        text: 'Deseja sair da aplicação?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, Quero sair!'
      }).then((result) => {
        if (result.isConfirmed) {
          (
            this.signOut(),
            this.$router.push('/').catch(()=>{}),
            window.location.reload()
          )
        }
      })
  
    },
    register(){
      if (this.formSignup.firstName === ''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por Favor Preencha o Campo Nome',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else

       if (this.formSignup.lastName === ''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por Favor Preencha o Campo Ultimo Nome',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else

       if (this.formSignup.email=== ''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por Favor Preencha o Campo Email',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else

      if (this.formSignup.email.indexOf('@') === -1){
        this.$swal({
          title: 'Erro',
          text: 'Por Favor Coloque um Email Valido',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else

      if (this.formSignup.birthDate === ''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por favor Preencha o Campo Data de Aniversario',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else

      if (this.formSignup.phone ===''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por Favor Preencha o Campo Telefone',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      } else

      if (this.formSignup.password === ''){
        this.$swal({
          title: 'Atenção!',
          text: 'Por Favor Preencha o Campo Senha',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      } else

      if (this.formSignup.password.length < 6){
        this.$swal({
          title: 'Atenção!',
          text: 'A Sua Senha Deve Ter no Minimo 6 Caracteres',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
      } else
      this.signUp(this.formSignup).then(
        () => {
          this.$swal({
            title: 'Tudo certo!',
            text: 'Cadastro realizado com sucesso',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.signupInModal = false
        },
        error=>{
          console.log({...error})
          const message = error.response.data.error
          this.$swal({
            title: 'Ops ...',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
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