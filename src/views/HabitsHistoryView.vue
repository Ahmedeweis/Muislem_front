<template>
    <div class="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 font-sans text-slate-800">
        <div class="max-w-5xl mx-auto space-y-10 relative z-10">
            <!-- Ambient Glow -->
            <div
                class="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none -z-10">
            </div>

            <!-- Header Section -->
            <div
                class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 mb-10 mt-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div class="space-y-2 relative z-10">
                    <button @click="router.back()"
                        class="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold transition-colors mb-4 group w-fit outline-none bg-slate-50 px-4 py-2 rounded-xl">
                        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        العودة
                    </button>
                    <h2
                        class="text-4xl sm:text-5xl font-black bg-gradient-to-l from-emerald-600 to-teal-800 bg-clip-text text-transparent pb-2 font-arabic tracking-tight">
                        سجل الطاعات
                    </h2>
                    <p class="text-slate-500 text-lg font-medium">استعرض أيامك السابقة وما قدمت فيها</p>
                </div>
            </div>

            <!-- Main Content Area -->
            <transition name="fade" mode="out-in">
                <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4 min-h-[50vh]">
                    <div
                        class="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin">
                    </div>
                    <div class="text-xl text-emerald-600 font-medium animate-pulse">جاري التحميل...</div>
                </div>

                <div v-else-if="history.length === 0"
                    class="flex flex-col items-center justify-center py-20 text-center">
                    <div
                        class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                        <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-700 font-arabic mb-2">لا يوجد سجل حتى الآن</h3>
                    <p class="text-slate-500 max-w-sm">ابدأ بتسجيل طاعاتك من صفحة "عبادتي اليومية" لتظهر هنا.</p>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    <!-- Day Card -->
                    <button v-for="day in history" :key="day.id" @click="openModal(day)"
                        class="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.1)] transition-all duration-300 transform hover:-translate-y-1 text-right flex flex-col group relative overflow-hidden outline-none">

                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        </div>

                        <div class="flex justify-between items-start mb-4 relative z-10">
                            <div
                                class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <!-- Small quick stat: number of tracked items -->
                            <div
                                class="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">
                                {{ calculateScore(day) }} من 4
                            </div>
                        </div>

                        <h3 class="text-2xl font-bold text-slate-800 font-arabic relative z-10 mb-1">
                            {{ formatDate(day.date) }}
                        </h3>
                        <p class="text-slate-500 text-sm font-medium relative z-10">
                            {{ getRelativeDay(day.date) }}
                        </p>
                    </button>
                </div>
            </transition>

            <!-- Details Modal -->
            <transition name="modal-fade">
                <div v-if="selectedDay" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <!-- Backdrop -->
                    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>

                    <!-- Modal Content -->
                    <div
                        class="bg-white rounded-[2.5rem] w-full max-w-lg relative z-[101] shadow-2xl overflow-hidden transform transition-all border border-emerald-100">
                        <!-- Modal Header -->
                        <div class="bg-gradient-to-l from-emerald-600 to-teal-700 p-8 text-white relative">
                            <div class="absolute top-0 right-0 w-full h-full pattern-bg opacity-10"></div>
                            <button @click="closeModal"
                                class="absolute top-6 left-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-md outline-none">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div class="relative z-10">
                                <p class="text-emerald-100 font-medium mb-1">{{ getRelativeDay(selectedDay.date) }}</p>
                                <h3 class="text-3xl font-black font-arabic">{{ formatDate(selectedDay.date) }}</h3>
                            </div>
                        </div>

                        <!-- Modal Body -->
                        <div class="p-8 space-y-6 bg-[#F8FAFC]">

                            <!-- Detailed Stats -->
                            <div
                                class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-slate-700 font-arabic">أذكار الصباح والمساء</h4>
                                </div>
                                <div v-if="selectedDay.morning_athkar" class="text-emerald-500">
                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div v-else class="text-slate-300">
                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>

                            <div
                                class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-slate-700 font-arabic">الدعاء</h4>
                                </div>
                                <div v-if="selectedDay.duaa" class="text-emerald-500">
                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div v-else class="text-slate-300">
                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>

                            <div
                                class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-slate-700 font-arabic">قيام الليل</h4>
                                </div>
                                <div class="font-black text-2xl"
                                    :class="selectedDay.qiyam_rakaat > 0 ? 'text-emerald-600' : 'text-slate-400'">
                                    {{ selectedDay.qiyam_rakaat }} <span
                                        class="text-sm font-medium text-slate-400">ركعات</span>
                                </div>
                            </div>

                            <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                                <div class="flex items-center gap-4 mb-4">
                                    <div
                                        class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-slate-700 font-arabic">الصلوات في جماعة</h4>
                                </div>

                                <div class="grid grid-cols-5 gap-2">
                                    <div v-for="(prayer, index) in ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء']"
                                        :key="index"
                                        class="flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-colors"
                                        :class="parseJamaah(selectedDay.prayers_jamaah)[index] ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'">
                                        <span class="text-xs font-bold mb-1">{{ prayer }}</span>
                                        <div class="w-4 h-4 rounded-full flex items-center justify-center"
                                            :class="parseJamaah(selectedDay.prayers_jamaah)[index] ? 'bg-emerald-500' : 'bg-slate-200'">
                                            <svg v-if="parseJamaah(selectedDay.prayers_jamaah)[index]"
                                                class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                                    d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const memberId = route.params.memberId;

const history = ref([]);
const loading = ref(true);
const selectedDay = ref(null);

const fetchHistory = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`http://localhost:5000/api/habits/history?memberId=${memberId}`);
        history.value = response.data;
    } catch (err) {
        console.error('Failed to fetch history', err);
    } finally {
        setTimeout(() => { loading.value = false; }, 300);
    }
};

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
};

const getRelativeDay = (dateString) => {
    const today = new Date();
    const target = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today - target);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'أمس';
    if (diffDays === 2) return 'أول أمس';
    return `منذ ${diffDays} أيام`;
};

const calculateScore = (day) => {
    let score = 0;
    if (day.morning_athkar) score++;
    if (day.duaa) score++;
    if (day.qiyam_rakaat > 0) score++;

    const prayers = parseJamaah(day.prayers_jamaah);
    const performedPrayers = prayers.filter(p => p).length;
    if (performedPrayers > 0) score++; // Count jamaah as 1 overall point if at least one is done.

    return score;
};

const parseJamaah = (prayers) => {
    if (Array.isArray(prayers)) return prayers;
    if (typeof prayers === 'string') return JSON.parse(prayers);
    return [false, false, false, false, false];
};

const openModal = (day) => {
    selectedDay.value = day;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    selectedDay.value = null;
    document.body.style.overflow = '';
};

onMounted(() => {
    fetchHistory();
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

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.modal-fade-enter-active .absolute,
.modal-fade-leave-active .absolute {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from .absolute,
.modal-fade-leave-to .absolute {
    opacity: 0;
}

.pattern-bg {
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px);
    background-size: 20px 20px;
}
</style>
