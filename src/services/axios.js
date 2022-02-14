import axios from 'axios';
import store from '../store';
const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'
const api = axios.create({
	baseURL
});

api.interceptors.request.use(
  config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	err => Promise.reject(err)
);

api.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if(error.response.data.error == 'Token inválido!'){
			store.dispatch('auth/signOut')
			window.location.reload()
		}
		return Promise.reject(error);
	}
);

export default api;
