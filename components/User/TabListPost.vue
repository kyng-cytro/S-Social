<template>
  <li>
    <NuxtLink
      :to="'/posts/' + id"
      class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
    >
      <div class="py-2 w-4/5 text-gray-600 dark:text-gray-400 space-y-1">
        <div class="text-sm sm:text-base font-normal">
          <span class="font-medium text-gray-900 dark:text-white">{{
            title
          }}</span>
        </div>
        <p class="truncate text-xs sm:text-sm font-normal">"{{ content }}"</p>
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  id: String,
  title: String,
  content: String,
});
</script>
