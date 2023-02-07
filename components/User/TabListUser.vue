<template>
  <li>
    <NuxtLink
      :to="'/user/' + username"
      class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
    >
      <nuxt-img
        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
        :src="profileImage"
        :alt="username"
        placeholder
      />
      <div class="py-2 w-4/5 text-gray-600 dark:text-gray-400 space-y-1">
        <div class="text-sm sm:text-base font-normal">
          <span class="font-medium text-gray-900 dark:text-white">{{
            username
          }}</span>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  username: String,
  profileImage: String,
});
</script>
