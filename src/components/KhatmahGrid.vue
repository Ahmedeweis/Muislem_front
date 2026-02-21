<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-card border border-gray-700 text-center rounded-2xl overflow-hidden">
            <thead>
                <tr class="bg-gray-800 text-gray-300">
                    <th class="p-3 sticky right-0 bg-gray-800 z-10 border-b border-gray-700">المشارك</th>
                    <th v-for="juz in 30" :key="juz" class="p-3 min-w-[60px] border-b border-gray-700 text-sm">
                        ن{{ juz }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in members" :key="member.id"
                    class="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                    :class="{ 'bg-gray-900': member.id === currentMemberId }">
                    <td class="p-3 sticky right-0 bg-card z-10 font-bold border-l border-gray-700"
                        :class="member.id === currentMemberId ? 'text-accent' : 'text-primary-DEFAULT'">
                        {{ member.name }} {{ member.id === currentMemberId ? '(أنت)' : '' }}
                    </td>
                    <td v-for="juz in 30" :key="juz" class="p-3 border-l border-gray-700">
                        <input type="checkbox" :checked="isCompleted(member.id, juz)"
                            @change="toggleProgress(member.id, juz, $event.target.checked)"
                            :disabled="member.id !== currentMemberId"
                            class="w-6 h-6 rounded border-gray-600 focus:ring-primary-DEFAULT text-primary-DEFAULT bg-bg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    members: Array,
    progress: Object, // { memberId: { 1: true, 2: false } }
    currentMemberId: Number
});

const emit = defineEmits(['update-progress']);

const isCompleted = (memberId, juz) => {
    return props.progress[memberId]?.[juz] || false;
};

const toggleProgress = (memberId, juz, checked) => {
    emit('update-progress', { userId: memberId, juz, isCompleted: checked });
};
</script>

<style scoped>
div::-webkit-scrollbar {
    height: 8px;
}

div::-webkit-scrollbar-track {
    background: #121826;
}

div::-webkit-scrollbar-thumb {
    background: #4B5563;
    border-radius: 4px;
}
</style>
