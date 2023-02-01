<template>
  <div
    class="font-mono min-h-screen w-full flex flex-col text-black dark:text-white items-center bg-slate-100 dark:bg-slate-800 p-6 sm:p-10"
  >
    <Navbar class="mb-5" />
    <div class="h-full flex-1 w-full flex justify-center">
      <NuxtPage />
    </div>
    <Footer class="mt-5" />
  </div>
</template>
