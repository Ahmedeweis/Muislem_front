import { defineStore } from 'pinia';
import api from '../services/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(username, password) {
            try {
                const response = await api.post('/api/admin/login', { username, password });
                this.token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));

                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return true;
            } catch (error) {
                console.error('Login failed:', error);
                throw error.response?.data?.error || 'Login failed';
            }
        },
        async register(username, password) {
            try {
                await api.post('/api/admin/register', { username, password });
                return true;
            } catch (error) {
                throw error.response?.data?.error || 'Registration failed';
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common['Authorization'];
            window.location.reload();
        }
    }
});
