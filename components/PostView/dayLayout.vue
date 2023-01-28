<template>
  <div
    class="relative w-full max-w-4xl p-5 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <NuxtLink
      :to="'/user/' + name"
      class="flex items-center p-3 space-x-2 hover:dark:bg-slate-700 hover:bg-slate-300 max-w-max rounded-md"
      v-if="showUser"
    >
      <img
        class="w-8 h-8 rounded-full sm:mb-0 ring-2 ring-gray-300 dark:ring-gray-500"
        :src="image"
        :alt="name"
      />
      <span class="text-lg font-semibold text-gray-900 dark:text-white">{{
        name
      }}</span>
    </NuxtLink>
    <ol class="mt-3 h-full divide-y divide-gray-400 dark:divide-gray-700">
      <slot />
    </ol>
    <ButtonsFloatingIcon to="/posts/add" class="absolute right-6 bottom-7" />
  </div>
</template>

<script lang="ts" setup>
const { name, image } = defineProps({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  showUser: {
    type: Boolean,
    required: true,
  },
});
</script>
