<template>
  <NuxtLink
    :to="to ?? '/'"
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <svg
      aria-hidden="true"
      class="w-4 h-4 transition-transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
    <span class="sr-only">Icon description</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
  },
});
</script>
