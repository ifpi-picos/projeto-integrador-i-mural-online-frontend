import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import theme from '@/store/modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: { auth, theme },
})
