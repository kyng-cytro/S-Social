<template>
  <li>
    <NuxtLink
      :to="`/posts/${id}`"
      class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
    >
      <nuxt-img
        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
        :src="profile_image"
        :alt="username"
      />
      <div class="w-4/5 text-gray-600 dark:text-gray-400">
        <div class="text-sm sm:text-base font-normal">
          <span class="font-medium text-gray-900 dark:text-white">{{
            title
          }}</span>
        </div>
        <p class="truncate text-xs sm:text-sm font-normal">"{{ content }}"</p>

        <PostViewPrivateBadge v-if="is_private" />
        <PostViewPublicBadge v-else />
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
const { title, content, username, profile_image, id, is_private } = defineProps(
  {
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
    is_private: {
      type: Boolean,
    },
  }
);
</script>
