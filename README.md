# 🕌 مُسلم — تطبيق تتبع العبادات اليومية

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State_Management-yellow?style=for-the-badge&logo=pinia&logoColor=white)

**تطبيق ويب إسلامي لتتبع العبادات اليومية داخل مجموعات** 🌙

[🚀 الموقع المباشر](https://muislem-front.vercel.app) · [⚙️ الباك إند API](https://muislem-back.onrender.com/api-docs)

</div>

---

## ✨ المميزات

- 🏘️ **نظام المجموعات** — أنشئ مجموعة بكلمة مرور أو انضم لمجموعة موجودة باسمك
- 📋 **العبادات اليومية** — سجّل أذكار الصباح والمساء، الدعاء، قيام الليل، والصلوات في جماعة
- 📅 **سجل الطاعات** — استعرض إنجازاتك السابقة يوماً بيوم
- 👨‍👩‍👧‍👦 **تقدم الأعضاء** — شوف تقدم كل عضو في المجموعة بشكل مباشر
- 📱 **تصميم متجاوب** — يعمل بسلاسة على الموبايل والكمبيوتر

---

## 🗂️ هيكل المشروع

```
Muislem_front/
├── src/
│   ├── views/
│   │   ├── HomeView.vue           # الصفحة الرئيسية - عرض المجموعات
│   │   ├── GroupDetailsView.vue   # تفاصيل المجموعة وتقدم الأعضاء
│   │   ├── DailyHabitsView.vue    # تسجيل العبادات اليومية
│   │   └── HabitsHistoryView.vue  # سجل الطاعات السابقة
│   ├── components/
│   │   └── DailyHabits/
│   │       ├── HabitToggle.vue    # زر تفعيل/تعطيل للعبادة
│   │       ├── HabitCounter.vue   # عداد الركعات
│   │       └── JamaahPrayers.vue  # الصلوات الخمس في جماعة
│   ├── stores/
│   │   ├── groups.js              # Pinia store للمجموعات
│   │   └── auth.js                # Pinia store للمصادقة
│   ├── services/
│   │   └── axios.js               # إعداد Axios مع baseURL
│   └── router/
│       └── index.js               # Vue Router - تعريف المسارات
├── .env                           # متغيرات البيئة المحلية
├── .env.production                # متغيرات البيئة للإنتاج
├── vercel.json                    # إعداد Vercel للـ SPA routing
└── vite.config.js                 # إعداد Vite
```

---

## ⚙️ إعداد المشروع محلياً

### المتطلبات
- Node.js 18+
- npm أو yarn

### خطوات التشغيل

```bash
# 1. استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/Muislem_front.git
cd Muislem_front

# 2. تثبيت المكتبات
npm install

# 3. إعداد متغيرات البيئة
# ملف .env موجود بالفعل للبيئة المحلية
# VITE_API_BASE_URL=http://localhost:5000/api

# 4. تشغيل السيرفر المحلي
npm run dev
```

---

## 🌐 المسارات (Routes)

| المسار | الصفحة |
|--------|---------|
| `/` | الصفحة الرئيسية — عرض وإنشاء المجموعات |
| `/group/:id` | تفاصيل المجموعة وتقدم الأعضاء |
| `/habits/:memberId` | تسجيل العبادات اليومية |
| `/habits-history/:memberId` | سجل الطاعات السابقة |

---

## 🔗 الاتصال بالـ API

الـ API مبني على:
- **Express.js** + **PostgreSQL**
- مرفوع على: [Render.com](https://muislem-back.onrender.com)
- توثيق API: [Swagger UI](https://muislem-back.onrender.com/api-docs)

```js
// src/services/axios.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // ✅ مثال: https://muislem-back.onrender.com/api
});
```

> **⚠️ تنبيه:** لا تضيف `/api` في بداية أي endpoint في الكود،
> لأن الـ `baseURL` تحتوي عليها بالفعل.

---

## 🚀 النشر على Vercel

1. ارفع المشروع على GitHub
2. أنشئ مشروع جديد على [Vercel](https://vercel.com)
3. اختر الـ Repository
4. اضبط **Environment Variables** في Vercel:
   - `VITE_API_BASE_URL` = `https://muislem-back.onrender.com/api`
5. اضبط **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. ملف `vercel.json` موجود بالفعل لحل مشكلة refresh الـ 404

---

## 🛠️ التقنيات المستخدمة

| التقنية | الغرض |
|---------|--------|
| **Vue 3** (Composition API) | إطار عمل الفرونت إند |
| **Vite** | أداة البناء والتطوير |
| **Pinia** | إدارة الحالة (State Management) |
| **Vue Router** | التنقل بين الصفحات |
| **Axios** | طلبات HTTP للـ API |
| **Tailwind CSS** | تنسيق واجهة المستخدم |
| **Vue Toastification** | إشعارات المستخدم |

---

## 📄 الرخصة

هذا المشروع للاستخدام الشخصي والتعليمي. 🤍
