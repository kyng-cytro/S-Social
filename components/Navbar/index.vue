<template>
  <nav
    class="border-b border-gray-200 dark:border-gray-700 flex items-center gap-3"
  >
    <button
      class="inline-flex py-4 px-2 text-gray-500 dark:text-gray-400 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-500 focus:text-blue-600 focus:border-blue-500 dark:focus:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:dark:ring-blue-600"
      v-show="current != '/' && current != '/auth'"
      @click="$router.back()"
    >
      <svg
        fill="none"
        class="w-5 h-5 hover:text-blue-600 dark:hover:text-blue-500"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        ></path>
      </svg>
    </button>
    <ul
      class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
    >
      <li class="mr-2">
        <NavbarNavBarLink
          to="/"
          class="inline-flex sm:p-4 py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-500 focus:text-blue-600 focus:border-blue-500 dark:focus:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:dark:ring-blue-600 group"
          aria-current="page"
        >
          <svg
            aria-hidden="true"
            class="hidden sm:block w-5 h-5 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            ></path>
          </svg>
          For You
        </NavbarNavBarLink>
      </li>
      <li class="mr-2">
        <NavbarNavBarLink
          to="/posts"
          class="inline-flex sm:p-4 py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-500 focus:text-blue-600 focus:border-blue-500 dark:focus:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:dark:ring-blue-600 group"
          aria-current="page"
        >
          <svg
            aria-hidden="true"
            class="hidden sm:block w-5 h-5 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path></svg
          >Explore
        </NavbarNavBarLink>
      </li>
      <li class="mr-2">
        <NavbarNavBarLink
          to="/user"
          class="inline-flex sm:p-4 py-4 px-2 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-500 focus:text-blue-600 focus:border-blue-500 dark:focus:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:dark:ring-blue-600 group"
        >
          <svg
            aria-hidden="true"
            class="hidden sm:block w-5 h-5 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path></svg
          >Profile
        </NavbarNavBarLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
defineProps({
  current: String,
});
</script>
