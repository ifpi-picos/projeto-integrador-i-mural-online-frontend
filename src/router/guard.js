import store from '../store'
const guard = {
	auth: (to, from, next) => {
		const logged = store.getters['auth/authenticated']
		if (logged) next()
		else next('/')
	},
	publisher: (to, from, next) => {
		const user = store.getters['auth/userAuthenticated']
		if (user != {}) {
			if (user.role == 'publisher') next()
			else next('/')
		} else next('/')
	},
	admin: (to, from, next) => {
		const user = store.getters['auth/userAuthenticated']
		if (user != {}) {
			if (user.role == 'admin') next()
			else next('/')
		} else next('/')
	},
}

export default guard
