export default {
    namespaced: true,
    state: () => ({ 
      theme: localStorage.getItem('theme') || 'light',
    }),
    getters: {
      getTheme: state => state.theme,
  
    },
    actions: {
      // eslint-disable-next-line no-unused-vars
      ChangeTheme({ commit }, value){
          commit('Change', value)
      },
    },
    mutations: {
      Change(state, data) {
        state.theme = data
        localStorage.setItem('theme', data)
       },
      },
  }
  