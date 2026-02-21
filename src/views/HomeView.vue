<template>
  <div class="min-h-screen text-slate-100 py-8 px-4 sm:py-16 sm:px-6 selection:bg-emerald-500/30">
    <div
      class="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none">
    </div>

    <div class="max-w-6xl mx-auto relative z-10 space-y-16">

      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800/50 pb-8">
        <div class="space-y-3">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            مجتمع الطاعة
          </div>
          <h2
            class="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-l from-blue-700 to-blue-500 bg-clip-text text-transparent font-arabic leading-snug">
            انضم لمجموعة أو أنشئ واحدة
          </h2>
          <p class="text-black text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
            انضم لصحبة صالحة في رحلة الختمة، ونافس في الخيرات.
          </p>
        </div>

        <button @click="showCreateModal = true"
          class="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 md:px-10 md:py-5 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-emerald-500/40 hover:-translate-y-1 w-full md:w-auto">
          <span class="relative z-10 flex items-center justify-center gap-2 text-base md:text-lg">
            <span class="text-xl md:text-2xl">+</span> إنشاء مجموعة جديدة
          </span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer">
          </div>
        </button>
      </div>

      <div v-if="groupsStore.loading" class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p class="text-slate-400 animate-pulse font-medium">جاري تجهيز المجموعات...</p>
      </div>

      <div v-else-if="groupsStore.allGroups.length === 0"
        class="relative overflow-hidden text-center p-20 bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] border border-slate-800 shadow-2xl">
        <div class="text-7xl mb-6 opacity-20">🌙</div>
        <p class="text-3xl font-bold text-slate-200 font-arabic">لا توجد مجموعات بعد</p>
        <p class="text-slate-500 mt-4 max-w-sm mx-auto text-lg leading-relaxed">
          كن أنت من يفتح باب الخير، وأنشئ أول مجموعة لختم القرآن في رمضان.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="group in sortedGroups" :key="group.id"
          class="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-2 flex flex-col justify-between overflow-hidden">

          <div
            class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 opacity-0 group-hover:opacity-100 rounded-full blur-3xl transition-opacity duration-700">
          </div>

          <div class="relative z-10">
            <div class="flex justify-between items-start mb-6">


              <div class="text-slate-300 group-hover:text-emerald-500 transition-colors duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <h3
              class="text-2xl font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors font-arabic leading-snug">
              {{ group.name }}
            </h3>

            <div class="mt-4 flex items-center gap-3 text-slate-500">
              <div class="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                <div class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200"></div>
                <div class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-300"></div>
                <div
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-600">
                  +5</div>
              </div>
              <span class="text-xs font-medium">بدأت في {{ new Date(group.created_at).toLocaleDateString('ar-EG')
              }}</span>
            </div>
          </div>

          <button @click="enterGroup(group)"
            class="relative z-10 mt-10 w-full bg-slate-50 hover:bg-emerald-600 text-slate-600 hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 border border-slate-100 hover:border-emerald-500 flex items-center justify-center gap-3 group/btn overflow-hidden shadow-sm">
            <span class="relative z-10">دخول للمجموعة</span>
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 relative z-10 group-hover:-translate-x-1 transition-transform" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
            </div>
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showCreateModal || showPasswordModal"
          class="fixed inset-0 bg-slate-800/40 backdrop-blur-md flex items-center justify-center z-[100] p-6">

          <div
            class="bg-white w-full max-w-md rounded-[2.5rem] p-10 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]"></div>

            <h3 class="text-3xl font-black mb-3 font-arabic text-center text-slate-800">
              {{ showCreateModal ? 'إنشاء عهد جديد' : 'تأكيد الهوية' }}
            </h3>
            <p class="text-center text-slate-500 text-sm font-medium mb-8">المجموعات المفتوحة رقمها السري 1 </p>

            <form @submit.prevent="handleForm" class="space-y-5 relative z-10">
              <template v-if="showCreateModal">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 mr-2 uppercase tracking-widest">اسم المجموعة</label>
                  <input v-model="newGroupName" placeholder="مثلاً: صحبة الفردوس" required
                    class="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg placeholder:text-slate-400 text-slate-800 shadow-sm" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 mr-2 uppercase tracking-widest">كلمة المرور
                    (اختياري)</label>
                  <input v-model="newGroupPassword" placeholder="إذا تُرك فارغاً ستكون المجموعة عامة" type="password"
                    class="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg placeholder:text-slate-400 text-slate-800 shadow-sm" />
                </div>
              </template>

              <template v-if="showPasswordModal">

                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">كلمة مرور المجموعة</label>
                  </div>
                  <input v-model="passwordInput" placeholder="أدخل كلمة المرور للانضمام" type="password" required
                    class="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg placeholder:text-slate-400 text-slate-800 shadow-sm" />
                </div>
              </template>

              <div class="flex flex-col gap-4 pt-6">
                <button type="submit" :disabled="isSubmitting"
                  class="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed py-5 rounded-2xl font-bold text-lg text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
                  <!-- Spinner -->
                  <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>{{ isSubmitting ? 'جاري التحقق...' : (showCreateModal ? 'تأكيد وإنشاء' : 'تأكيد وانضمام')
                    }}</span>
                </button>
                <button type="button" @click="closeModals"
                  class="text-slate-500 hover:text-slate-700 transition-colors font-medium">
                  تراجع عن العملية
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="toastMessage"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-red-500/20 w-max max-w-[90vw]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="font-bold text-lg font-arabic">{{ toastMessage }}</p>
        </div>
      </transition>

      <!-- زر المعلومات الثابت -->
      <button
        @click="showInfoModal = true"
        class="info-fab"
        title="معلومات عن الموقع"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <!-- مودال المعلومات -->
      <transition name="fade">
        <div v-if="showInfoModal"
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[300] p-6"
          @click.self="showInfoModal = false"
        >
          <div class="info-modal">
            <!-- خلفية ضوء زجاجي -->
            <div class="info-modal-glow"></div>

            <!-- أيقونة -->
            <div class="info-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 class="info-modal-title">تنبيه مهم</h3>

            <p class="info-modal-body">
              هذا الموقع <strong>غير ربحي</strong> ويعمل على مصادر مجانية بالكامل ومحدودة.
            </p>
            <p class="info-modal-body mt-3">
              من لديه القدرة على توفير <strong>استضافة</strong> أو <strong>دومين</strong>
              وتحمل تكلفة مالية، فليتواصل معي:
            </p>

            <a
              href="https://wa.me/201153161437"
              target="_blank"
              rel="noopener noreferrer"
              class="info-modal-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل عبر واتساب
            </a>

            <button @click="showInfoModal = false" class="info-modal-close">
              إغلاق
            </button>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<style>
/* تأثير الشيمر للزرار */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* تنعيم حركة المودال */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* حركة التوست */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

font-arabic {
  font-family: 'Tajawal', sans-serif;
}

/* ===== زر المعلومات الثابت ===== */
@keyframes info-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); }
}

.info-fab {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  border: none;
  cursor: pointer;
  animation: info-pulse 2.5s ease-in-out infinite;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
}

.info-fab:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

/* ===== مودال المعلومات ===== */
.info-modal {
  position: relative;
  background: #fff;
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  max-width: 26rem;
  width: 100%;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 25px 60px -10px rgba(0,0,0,0.15);
  border: 1px solid #f1f5f9;
}

.info-modal-glow {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%);
  pointer-events: none;
}

.info-modal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(217,119,6,0.1));
  border: 1px solid rgba(251,191,36,0.3);
  margin-bottom: 1rem;
}

.info-modal-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 1rem;
}

.info-modal-body {
  font-size: 1rem;
  color: #475569;
  line-height: 1.8;
}

.info-modal-body strong {
  color: #d97706;
  font-weight: 700;
}

.info-modal-whatsapp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-modal-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(37, 211, 102, 0.45);
}

.info-modal-close {
  display: block;
  margin: 1rem auto 0;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
}

.info-modal-close:hover {
  color: #64748b;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useGroupsStore } from '../stores/groups';
import { useRouter } from 'vue-router';

const groupsStore = useGroupsStore();
const router = useRouter();
const showCreateModal = ref(false);
const showPasswordModal = ref(false);
const showInfoModal = ref(false);
const selectedGroup = ref(null);

const newGroupName = ref('');
const newGroupPassword = ref('');

const passwordInput = ref('');
const toastMessage = ref('');
const isSubmitting = ref(false);

const showToast = (message) => {
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = '';
  }, 3000);
};

const closeModals = () => {
  showCreateModal.value = false;
  showPasswordModal.value = false;
};

const handleForm = () => {
  if (showCreateModal.value) {
    handleCreateGroup();
  } else if (showPasswordModal.value) {
    handlePasswordSubmit();
  }
};

onMounted(() => {
  groupsStore.fetchAllGroups();
});

// المجموعات المفتوحة (free) أولاً، ثم الخاصة — وداخل كل فئة الأقدم أولاً
const sortedGroups = computed(() => {
  return [...groupsStore.allGroups].sort((a, b) => {
    // المفتوح (false) قبل الخاص (true)
    if (a.is_private !== b.is_private) return a.is_private ? 1 : -1;
    // الأقدم أولاً في نفس الفئة
    return new Date(a.created_at) - new Date(b.created_at);
  });
});

const enterGroup = async (group) => {
  if (group.is_private) {
    if (groupsStore.verifiedGroups[group.id]) {
      router.push(`/group/${group.id}`);
    } else {
      selectedGroup.value = group;
      passwordInput.value = '';
      showPasswordModal.value = true;
    }
  } else {
    try {
      // It's an open group, we can just send the default password '1' directly to verifyGroup
      // to grant access, or if the API just requires it, we do it transparently.
      await groupsStore.verifyGroup(group.id, '1');
      router.push(`/group/${group.id}`);
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'حدث خطأ ما');
    }
  }
};

const handleCreateGroup = async () => {
  isSubmitting.value = true;
  try {
    const passwordToSend = newGroupPassword.value.trim() === '' ? '1' : newGroupPassword.value;
    await groupsStore.createGroup(newGroupName.value, passwordToSend);
    showCreateModal.value = false;
    newGroupName.value = '';
    newGroupPassword.value = '';
    groupsStore.fetchAllGroups();
  } catch (err) {
    showToast(err.response?.data?.error || err.message || 'حدث خطأ أثناء الإنشاء');
  } finally {
    isSubmitting.value = false;
  }
};

const handlePasswordSubmit = async () => {
  isSubmitting.value = true;
  try {
    await groupsStore.verifyGroup(selectedGroup.value.id, passwordInput.value);
    showPasswordModal.value = false;
    passwordInput.value = '';
    router.push(`/group/${selectedGroup.value.id}`);
  } catch (err) {
    if (err.message && err.message.includes('401')) {
      showToast('كلمة المرور غير صحيحة');
    } else if (err.response && err.response.data && err.response.data.error) {
      showToast(err.response.data.error === 'Incorrect password' ? 'كلمة المرور غير صحيحة' : err.response.data.error);
    } else {
      showToast('كلمة المرور غير صحيحة');
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>