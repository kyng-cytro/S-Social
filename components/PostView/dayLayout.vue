<template>
  <div
    class="w-full max-w-4xl p-5 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <time class="text-lg font-semibold text-gray-900 dark:text-white">{{
      name
    }}</time>
    <ol class="mt-3 h-full divide-y divide-gray-400 dark:divide-gray-700">
      <slot />
    </ol>
  </div>
</template>

<script lang="ts" setup>
const { name } = defineProps({
  name: {
    type: String,
  },
});
</script>
