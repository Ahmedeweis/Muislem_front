<template>
    <div class="flex flex-col items-center justify-center min-h-[80vh]">
        <div class="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
            <h2 class="text-3xl font-bold text-center mb-6 text-blue-400">إنشاء حساب جديد</h2>

            <form @submit.prevent="handleRegister" class="space-y-6">
                <div>
                    <label class="block text-blue-300 mb-2">اسم المستخدم</label>
                    <input v-model="username" type="text"
                        class="w-full p-3 rounded-lg bg-bg border border-gray-600 focus:border-primary-DEFAULT focus:outline-none text-blue-200 text-right"
                        required />
                </div>

                <div>
                    <label class="block text-blue-300 mb-2">كلمة المرور</label>
                    <input v-model="password" type="password"
                        class="w-full p-3 rounded-lg bg-bg border border-gray-600 focus:border-primary-DEFAULT focus:outline-none text-blue-200 text-right"
                        required />
                </div>

                <div v-if="error" class="text-blue-300 text-center text-sm">{{ error }}</div>

                <button type="submit"
                    class="w-full bg-primary-DEFAULT hover:bg-primary-100 text-blue-50 font-bold py-3 rounded-lg transition-colors text-lg">
                    تسجيل
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-blue-400">لديك حساب بالفعل؟ <router-link to="/login"
                        class="text-blue-300 hover:underline">سجل الدخول</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
    try {
        await authStore.register(username.value, password.value);
        // Auto login or redirect to login
        await authStore.login(username.value, password.value);
        router.push('/');
    } catch (err) {
        error.value = err;
    }
};
</script>
