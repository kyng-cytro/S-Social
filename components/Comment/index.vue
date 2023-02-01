<template>
  <li class="relative mt-2 mb-10 ml-6">
    <span
      class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-9 top-3 ring-white dark:ring-gray-900 dark:bg-blue-900"
    >
      <img class="rounded-full shadow-lg" :src="src" :alt="name + ' image'" />
    </span>
    <div
      class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"
    >
      <time
        class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
        >{{ new Date(date).toLocaleDateString() }}</time
      >
      <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
        {{ text }}
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
const { name, src, date, text } = defineProps({
  name: { type: String, required: true },
  src: { type: String, required: true },
  date: { type: String, required: true },
  text: { type: String, required: true },
});
</script>
