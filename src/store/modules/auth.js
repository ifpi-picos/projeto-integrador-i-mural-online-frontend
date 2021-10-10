import axios from '../../services/axios'
const jwt = require('jsonwebtoken')
export default {
  namespaced: true,
  state: () => ({ 
    token: localStorage.getItem('token'),
  }),
  getters: {
    authenticated: state => !!state.token,
    userAuthenticated: state => {
      if(state.token){
        const data = jwt.decode(state.token)
        return data
      }
    },
  },
  actions: {
    async signIn({ commit }, userSignin){
      try {
        const res = await axios.post('auth/signin', userSignin)
        commit('signIn', res.data)
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    // eslint-disable-next-line no-unused-vars
    async signUp({ commit }, user){
      try {
        await axios.post('auth/signup', user)
      }
      catch(err){
        console.error(err)
        throw err
      }
    },
    signOut({commit}){
      commit('signOut')
    }
  },
  mutations: {
    signIn(state, data) {
			const { token } = data
      state.token = token
      localStorage.setItem('token', token)
		},
		signOut(state) {
      state.token = null
      localStorage.removeItem('token')
		},
	},

}