<template>
  <div
    class="flex w-24 h-20 flex-col items-center px-2.5 py-2.5 border border-slate-300 rounded-lg bg-slate-200 hover:border-slate-400 hover:bg-slate-300 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
    :class="avatar == src ? 'ring-2 ring-blue-600' : null"
  >
    <nuxt-img class="h-12 w-12" :src="src" placeholder />
    <span class="text-xs">{{ name }}</span>
  </div>
</template>

<script lang="ts" setup>
const { src, name, avatar } = defineProps({
  src: String,
  name: String,
  avatar: String,
});
</script>
