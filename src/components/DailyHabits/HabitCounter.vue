<template>
    <div class="relative group flex flex-row items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5"
        :class="modelValue > 0 ? 'border-emerald-500/30 bg-emerald-50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : ''">

        <!-- Left side: Icon and Label -->
        <div class="flex items-center gap-3 w-auto mb-0">
            <div class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-colors duration-300 shadow-inner shrink-0"
                :class="modelValue > 0 ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-100 text-emerald-600 group-hover:bg-slate-200'">
                <slot name="icon">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </slot>
            </div>
            <div>
                <h3 class="text-base sm:text-lg lg:text-xl font-bold font-arabic transition-all duration-300"
                    :class="modelValue > 0 ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-600'">
                    {{ label }}
                </h3>
            </div>
        </div>

        <!-- Right side: Counter Controls -->
        <div class="flex items-center gap-1.5 lg:gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0">
            <button @click="decrement"
                class="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center bg-white/5 text-emerald-400 hover:bg-white/20 active:scale-95 transition-all outline-none">
                <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4" />
                </svg>
            </button>

            <div class="relative w-12 lg:w-16">
                <input type="number" :value="modelValue" @input="updateValue" min="0" dir="ltr"
                    class="w-full h-8 lg:h-10 bg-transparent text-center text-emerald-300 font-bold text-lg lg:text-2xl focus:outline-none focus:text-emerald-400 transition-colors" />
                <!-- Custom focus underline glow -->
                <div
                    class="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/0 transition-all duration-300 group-focus-within:bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] opacity-0 group-focus-within:opacity-100">
                </div>
            </div>

            <button @click="increment"
                class="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center bg-white/5 text-emerald-400 hover:bg-emerald-500 hover:text-white active:scale-95 transition-all outline-none hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: { type: String, required: true },
    modelValue: { type: Number, required: true }
});
const emit = defineEmits(['update:modelValue', 'change']);

const updateValue = (e) => {
    const val = parseInt(e.target.value) || 0;
    emit('update:modelValue', val);
    emit('change', val);
};

const increment = () => {
    const newVal = props.modelValue + 1;
    emit('update:modelValue', newVal);
    emit('change', newVal);
};

const decrement = () => {
    if (props.modelValue > 0) {
        const newVal = props.modelValue - 1;
        emit('update:modelValue', newVal);
        emit('change', newVal);
    }
};
</script>
