import Vue from 'vue'
import VueRouter from 'vue-router'
import guard from './guard'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: () => import('@/layout/LayoutDefault.vue'),
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('@/views/Home.vue'),
			},
			{
				path: 'postagens',
				beforeEnter: guard.publisher,
				component: () => import('@/views/Posts.vue'),
			},
			{
				path: 'postagens_salvas',
				beforeEnter: guard.auth,
				component: () => import('@/views/SavedNotices.vue'),
			},
			{
				path: 'admin',
				beforeEnter: guard.admin,
				component: () => import('@/views/Admin.vue'),
			},
			{
				path: 'perfil',
				beforeEnter: guard.auth,
				component: () => import('@/views/Profile.vue'),
			},
		]
	},
	{
		path: '*',
		component: ()=>import('@/components/PageNotFound.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
	routes,
})

export default router
