<template>
  <div class=" bg-bg text-blue-200 font-sans">
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50 p-4 shadow-sm flex justify-between items-center px-6 md:px-12">

      <router-link to="/" class="group flex flex-col items-start transition-all">
        <span
          class="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-400">
          ختمة رمضان
        </span>
        <div class="h-1 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-full"></div>
      </router-link>

      <div class="flex flex-col items-end gap-1">

        <div class="hidden md:block text-[20px] uppercase tracking-widest text-blue-400 font-bold">
          ساعدوا بعضكم على الطاعة
        </div>
      </div>

    </header>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
