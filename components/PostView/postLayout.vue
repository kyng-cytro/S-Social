<template>
  <li>
    <NuxtLink
      :to="`/posts/${id}`"
      class="items-center block p-3 sm:flex hover:bg-slate-100 dark:hover:bg-gray-700"
    >
      <img
        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
        :src="profile_image"
        :alt="username"
      />
      <div class="text-gray-600 dark:text-gray-400">
        <div class="text-base font-normal">
          <span class="font-medium text-gray-900 dark:text-white">{{
            title
          }}</span>
        </div>
        <div
          class="max-w-lg md:max-w-xl lg:max-w-2xl text-ellipsis overflow-hidden text-sm font-normal"
        >
          {{ content }}
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
const { title, content, username, profile_image, id } = defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  username: {
    type: String,
  },
  profile_image: {
    type: String,
  },
  id: {
    type: String,
  },
});
</script>
