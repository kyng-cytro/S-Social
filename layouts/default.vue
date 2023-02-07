<template>
  <div
    class="font-mono min-h-screen w-full flex flex-col text-black dark:text-white items-center bg-slate-100 dark:bg-slate-800 p-6 sm:p-10"
  >
    <Navbar class="mb-5" :current="currentRoute" />
    <div class="h-full flex-1 w-full flex justify-center">
      <NuxtPage />
    </div>
    <Footer class="mt-5" />
  </div>
</template>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<script lang="ts" setup>
const route = useRoute();
const currentRoute = ref("");
watch(route, (to) => (currentRoute.value = to.path));
</script>
