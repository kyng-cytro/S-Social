<template>
  <div
    class="relative w-full max-w-4xl p-5 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <ol class="mt-3 h-full divide-y divide-gray-400 dark:divide-gray-700">
      <slot />
    </ol>
    <ButtonsFloatingIcon to="/posts/add" class="absolute right-6 bottom-7" />
  </div>
</template>
