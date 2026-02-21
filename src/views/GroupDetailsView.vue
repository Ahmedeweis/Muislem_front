<template>
    <div class=" bg-[#F8FAFC] py-12 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto space-y-8">

            <div v-if="groupsStore.loading" class="flex justify-center items-center p-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>

            <div v-else-if="groupsStore.currentGroup" class="space-y-8">

                <header
                    class="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 gap-6">
                    <div class="space-y-1">
                        <h2 class="text-3xl font-black text-slate-800 font-arabic leading-tight">
                            مجموعة <span class="text-emerald-600">{{ groupsStore.currentGroup.name }}</span>
                        </h2>
                        <p class="text-slate-500 font-medium">شارك رفاقك البركة.. حدد الأجزاء التي أكملتها</p>
                    </div>

                    <router-link to="/"
                        class="group flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all font-bold text-sm bg-slate-50 px-5 py-3 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>العودة للمجموعات</span>
                    </router-link>
                </header>

                <section class="max-w-2xl mx-auto">
                    <form @submit.prevent="handleAddMember" class="relative group">
                        <input v-model="newMemberName" placeholder="أدخل اسمك للانضمام ..." required
                            class="w-full p-5 pr-6 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm text-lg" />
                        <button type="submit"
                            class="absolute left-2 rounded-2xl top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-1.5xl font-bold transition-all shadow-md hover:shadow-emerald-200 flex items-center">
                            انضم الآن
                        </button>
                    </form>
                </section>

                <div v-if="topMembers.length > 0" class="flex flex-wrap justify-center items-center gap-3 mt-4">
                    <div v-if="topMembers[0]"
                        class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
                        <span class="text-base">🥇 الأول:</span>
                        <span>{{ topMembers[0].name }}</span>
                        <span class="text-xs font-black bg-yellow-200/50 px-2 py-1 rounded-md">{{
                            topMembers[0].progress.length }} جزء</span>
                    </div>
                    <div v-if="topMembers[1]"
                        class="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
                        <span class="text-base">🥈 الثاني:</span>
                        <span>{{ topMembers[1].name }}</span>
                        <span class="text-xs font-black bg-slate-200/50 px-2 py-1 rounded-md">{{
                            topMembers[1].progress.length }} جزء</span>
                    </div>
                    <div v-if="topMembers[2]"
                        class="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
                        <span class="text-base">🥉 الثالث:</span>
                        <span>{{ topMembers[2].name }}</span>
                        <span class="text-xs font-black bg-orange-200/50 px-2 py-1 rounded-md">{{
                            topMembers[2].progress.length }} جزء</span>
                    </div>
                </div>

                <div v-if="groupsStore.members.length === 0"
                    class="bg-white rounded-[2.5rem] p-20 text-center shadow-sm border border-slate-100 mt-8">
                    <div class="flex flex-col items-center gap-3">
                        <span class="text-4xl text-slate-300">🌙</span>
                        <p class="text-slate-400 font-medium text-lg">لا يوجد أعضاء في هذه المجموعة بعد.</p>
                    </div>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <div v-for="member in groupsStore.members" :key="member.id"
                        class="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col gap-6">

                        <!-- Member Header -->
                        <div class="flex justify-between items-start">
                            <router-link :to="`/habits/${member.id}`" class="flex flex-col group/link">
                                <span
                                    class="text-xl font-extrabold text-slate-800 group-hover/link:text-emerald-600 transition-colors">
                                    {{ member.name }}
                                </span>
                                <span class="text-xs text-slate-400 mt-1 font-medium italic">اضغط لعرض العبادات ◂</span>
                            </router-link>

                            <!-- Progress Stats -->
                            <div class="flex flex-col items-end">
                                <div class="relative flex items-center justify-center">
                                    <span class="text-2xl font-black text-slate-800">{{ member.progress.length }}</span>
                                    <span
                                        class="text-[10px] text-slate-400 mr-1 font-bold tracking-widest leading-none mt-2">جزءاً</span>
                                </div>
                                <div class="w-16 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div class="bg-emerald-500 h-full transition-all duration-1000"
                                        :style="{ width: `${(member.progress.length / 30) * 100}%` }"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Checkboxes Grid -->
                        <div class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                            <div class="flex flex-wrap justify-center gap-2">
                                <div v-for="i in 30" :key="i" class="relative group/tile">
                                    <label class="cursor-pointer block">
                                        <input type="checkbox" :checked="member.progress.includes(i)"
                                            @change="toggleProgress(member, i, $event.target.checked)"
                                            class="peer sr-only" />
                                        <div class="w-[34px] h-[34px] flex items-center justify-center rounded-[10px] border-2 text-[12px] font-bold transition-all duration-300
                                            border-slate-200 bg-white text-slate-400 
                                            peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:text-white peer-checked:shadow-sm
                                            hover:border-emerald-300 hover:text-emerald-600">
                                            {{ i }}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGroupsStore } from '../stores/groups';

const route = useRoute();
const groupsStore = useGroupsStore();
const groupId = route.params.id;
const newMemberName = ref('');

onMounted(() => {
    groupsStore.fetchGroupDetails(groupId);
});

// Calculate Top Members
const topMembers = computed(() => {
    if (!groupsStore.members || groupsStore.members.length === 0) return [];

    // Create a copy to avoid mutating the original store data
    const sortedMembers = [...groupsStore.members].sort((a, b) => {
        // Sort descending based on progress length
        return (b.progress?.length || 0) - (a.progress?.length || 0);
    });

    // Return only the top 3
    return sortedMembers.slice(0, 3);
});

const handleAddMember = async () => {
    try {
        await groupsStore.addMember(groupId, newMemberName.value);
        newMemberName.value = '';
    } catch (err) {
        alert('حدث خطأ أثناء إضافة العضو');
    }
};

const toggleProgress = async (member, juzNumber, isChecked) => {
    await groupsStore.toggleProgress(member.id, juzNumber, isChecked);
};
</script>
