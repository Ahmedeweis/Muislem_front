<template>
    <div
        class="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] mt-2">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
            <div
                class="flex-shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-emerald-500/10 text-emerald-400 shadow-inner">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <div>
                <h3
                    class="text-lg lg:text-xl font-bold bg-gradient-to-l from-emerald-300 to-teal-500 bg-clip-text text-transparent font-arabic pt-1">
                    الصلوات في جماعة</h3>
                <p class="text-[18px]  text-black mt-0 font-medium pb-1">اجعل المسجد رفيق دربك</p>
            </div>
        </div>

        <!-- Grid Layout for Prayers -->
        <!-- Forced strictly to 5 columns on all devices for a compact row, allowing horizontal overflow/scroll if absolutely needed on tiny screens, but text handles it. -->
        <div class="flex flex-row justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
            <button v-for="(prayer, index) in prayers" :key="index" @click="toggle(index)"
                class="relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-300 ease-out overflow-hidden group outline-none flex-1 min-w-[3.5rem]"
                :class="[
                    modelValue[index]
                        ? 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/10 active:scale-95'
                ]">
                <!-- Background Glowing Gradient when Active -->
                <div v-if="modelValue[index]"
                    class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/30 to-transparent opacity-60">
                </div>

                <span class="relative z-10 text-sm lg:text-base font-bold transition-colors duration-300"
                    :class="modelValue[index] ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-600'">
                    {{ prayer }}
                </span>

                <!-- Check Indicator -->
                <div class="relative z-10 mt-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    :class="modelValue[index] ? 'bg-emerald-500 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/5 group-hover:bg-white/10 border border-white/5'">
                    <svg v-if="modelValue[index]" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <div v-else
                        class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors">
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: Array, required: true }
});
const emit = defineEmits(['update:modelValue', 'change']);

const prayers = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];

const toggle = (index) => {
    const newValue = [...props.modelValue];
    newValue[index] = !newValue[index];
    emit('update:modelValue', newValue);
    emit('change', newValue);
};
</script>
