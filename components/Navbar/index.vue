<template>
  <nav class="border-b border-gray-200 dark:border-gray-700">
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
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path></svg
          >For You
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
          to="/settings"
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
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            ></path></svg
          >Settings
        </NavbarNavBarLink>
      </li>
    </ul>
  </nav>
</template>
