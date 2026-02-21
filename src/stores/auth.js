import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
                const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
                this.token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));

                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return true;
            } catch (error) {
                console.error('Login failed:', error);
                throw error.response?.data?.error || 'Login failed';
            }
        },
        async register(username, password) {
            try {
                await axios.post('http://localhost:5000/api/admin/register', { username, password });
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
            delete axios.defaults.headers.common['Authorization'];
            window.location.reload();
        }
    }
});
