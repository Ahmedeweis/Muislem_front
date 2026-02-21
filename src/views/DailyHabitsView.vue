<template>
    <div class="min-h-screen bg-[#F8FAFC] py-8 px-4 font-sans text-slate-800">
        <div class="max-w-2xl mx-auto space-y-6 relative z-10">

            <!-- Ambient Glow Effects -->
            <div
                class="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/5 blur-[100px] pointer-events-none -z-10">
            </div>

            <!-- Header Section -->
            <div
                class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-6 mt-0 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                <div class="space-y-3 relative z-10 w-full sm:w-auto">
                    <div class="flex flex-wrap items-center gap-2">
                        <button @click="router.back()"
                            class="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 font-bold transition-colors group w-fit outline-none bg-slate-50 px-3 py-1.5 rounded-lg text-sm">
                            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            العودة
                        </button>

                        <button @click="router.push(`/habits-history/${memberId}`)"
                            class="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-bold transition-colors group w-fit outline-none px-3 py-1.5 rounded-lg border border-emerald-100 text-sm">
                            <svg class="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            سجل الطاعات
                        </button>
                    </div>

                    <div>
                        <h2
                            class="text-2xl sm:text-3xl font-black bg-gradient-to-l from-emerald-600 to-teal-800 bg-clip-text text-transparent pb-1 font-arabic tracking-tight">
                            عبادتي اليومية
                        </h2>
                        <p class="text-slate-500 text-sm font-medium">سجل طاعاتك، وارتقِ بروحك</p>
                    </div>
                </div>

                <!-- Date Selector -->
                <div
                    class="bg-slate-50 border border-slate-200 p-2 pl-4 rounded-xl shadow-sm flex items-center gap-2 w-full sm:w-auto relative overflow-hidden group hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors cursor-pointer">
                    <svg class="w-5 h-5 text-emerald-500 relative z-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input v-model="selectedDate" type="date" @change="fetchHabits"
                        class="bg-transparent border-none text-slate-700 font-bold text-base w-full outline-none cursor-pointer focus:ring-0 relative z-10 p-0" />
                </div>
            </div>

            <!-- Main Content Area -->
            <transition name="fade" mode="out-in">
                <div v-if="loading" class="flex flex-col items-center justify-center py-10 space-y-4 min-h-[40vh]">
                    <div
                        class="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin">
                    </div>
                    <div class="text-lg text-emerald-600 font-medium animate-pulse">جاري التحميل...</div>
                </div>

                <div v-else class="space-y-4 relative z-10">

                    <!-- Individual Toggles / Counters -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <HabitToggle label="أذكار الصباح والمساء" v-model="habits.morning_athkar">
                            <template #icon>
                                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </template>
                        </HabitToggle>

                        <HabitToggle label="الدعاء" v-model="habits.duaa">
                            <template #icon>
                                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </template>
                        </HabitToggle>
                    </div>

                    <div class="w-full">
                        <HabitCounter style="color: black !important;" label="قيام الليل (ركعات)"
                            v-model="habits.qiyam_rakaat" />
                    </div>

                    <!-- Component for Jamaah Prayers -->
                    <JamaahPrayers v-model="habits.prayers_jamaah" />

                    <!-- Save Button -->
                    <button @click="saveHabits" :disabled="isSaving"
                        class="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-1 mt-6 mb-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        <span v-if="!isSaving">حفظ الطاعات</span>
                        <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin">
                        </div>
                        <svg v-if="!isSaving" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                </div>
            </transition>

            <!-- Custom Toast for feedback -->
            <transition name="toast-slide">
                <div v-if="toastMessage"
                    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl w-max max-w-[90vw]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="font-bold text-lg font-arabic tracking-wide">{{ toastMessage }}</p>
                </div>
            </transition>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/axios';

// Import new components
import HabitToggle from '../components/DailyHabits/HabitToggle.vue';
import HabitCounter from '../components/DailyHabits/HabitCounter.vue';
import JamaahPrayers from '../components/DailyHabits/JamaahPrayers.vue';

const route = useRoute();
const router = useRouter();
const memberId = route.params.memberId || '1'; // Fallback for local testing if path varies
const memberName = ref('');

const loading = ref(false);
const isSaving = ref(false);
const toastMessage = ref('');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const habits = ref({
    morning_athkar: false,
    qiyam_rakaat: 0,
    duaa: false,
    prayers_jamaah: [false, false, false, false, false]
});

const showToast = (message) => {
    toastMessage.value = message;
    setTimeout(() => {
        toastMessage.value = '';
    }, 3000);
};

const fetchHabits = async () => {
    loading.value = true;
    try {
        const response = await api.get(`/api/habits?memberId=${memberId}&date=${selectedDate.value}`);
        // Reset defaults first if no data
        habits.value = {
            morning_athkar: false,
            qiyam_rakaat: 0,
            duaa: false,
            prayers_jamaah: [false, false, false, false, false]
        };

        if (response.data && response.data.date) {
            const data = response.data;
            habits.value.morning_athkar = data.morning_athkar;
            habits.value.qiyam_rakaat = data.qiyam_rakaat;
            habits.value.duaa = data.duaa;

            if (Array.isArray(data.prayers_jamaah)) {
                habits.value.prayers_jamaah = data.prayers_jamaah;
            } else if (typeof data.prayers_jamaah === 'string') {
                habits.value.prayers_jamaah = JSON.parse(data.prayers_jamaah);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        setTimeout(() => { loading.value = false; }, 300); // slight delay for smooth transition
    }
};

const saveHabits = async () => {
    isSaving.value = true;
    try {
        await api.post('/api/habits', {
            memberId,
            date: selectedDate.value,
            ...habits.value
        });
        showToast('تم حفظ الطاعات بوركت جهودك!');
    } catch (err) {
        console.error('Failed to save habits', err);
        showToast('حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.');
    } finally {
        setTimeout(() => { isSaving.value = false; }, 500);
    }
};

onMounted(() => {
    fetchHabits();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
    opacity: 0;
    transform: translate(-50%, 100%);
}

/* Base custom native date picker styling specifically for chromium */
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(50%) sepia(80%) saturate(400%) hue-rotate(110deg) brightness(90%) contrast(90%);
    cursor: pointer;
}
</style>
