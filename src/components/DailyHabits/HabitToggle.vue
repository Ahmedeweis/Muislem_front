<template>
    <div class="relative group flex flex-row items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-0.5"
        :class="modelValue ? 'border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : ''"
        @click="toggle">

        <!-- Left side: Icon and Label -->
        <div class="flex items-center gap-3 w-auto mb-0">
            <div class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-colors duration-300 shadow-inner shrink-0"
                :class="modelValue ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-emerald-400 group-hover:bg-white/10'">
                <slot name="icon">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </slot>
            </div>
            <div>
                <h3 class="text-base sm:text-lg lg:text-xl font-bold font-arabic transition-all duration-300"
                    :class="modelValue ? 'text-emerald-300' : 'text-blue-100 group-hover:text-white'">
                    {{ label }}
                </h3>
            </div>
        </div>

        <!-- Right side: Toggle Switch -->
        <div class="relative w-12 h-6 lg:w-14 lg:h-7 rounded-full transition-all duration-300 ease-in-out shrink-0"
            :class="modelValue ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-black/40 border border-white/10'">
            <div class="absolute top-[2px] lg:top-[3px] w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center"
                :class="modelValue ? 'left-1' : 'right-1'">
                <svg v-if="modelValue" class="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: { type: String, required: true },
    modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue', 'change']);

const toggle = () => {
    emit('update:modelValue', !props.modelValue);
    emit('change', !props.modelValue);
};
</script>
