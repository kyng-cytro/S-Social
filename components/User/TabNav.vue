<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex flex-wrap -mb-px">
      <li class="mr-2">
        <button
          @click="$emit('tab-to-0')"
          :class="
            tab == 0
              ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
              : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
          "
        >
          Posts
        </button>
      </li>
      <li class="mr-2">
        <button
          @click="$emit('tab-to-1')"
          :class="
            tab == 1
              ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
              : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
          "
        >
          Followers
        </button>
      </li>
      <li class="mr-2">
        <button
          @click="$emit('tab-to-2')"
          :class="
            tab == 2
              ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
              : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
          "
        >
          Following
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  tab: Number,
});
</script>
