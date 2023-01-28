<template>
  <form
    @submit.prevent="handle_submit"
    class="flex flex-col justify-center space-y-5 items-center"
  >
    <p class="text-sm text-red-500" v-show="showError.status">
      {{ showError.message }}
    </p>
    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Username</label
      >
      <div class="flex">
        <span
          class="font-serif inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
        >
          @
        </span>
        <input
          type="text"
          id="username"
          v-model="username"
          class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="cytro..."
          pattern=".{6,12}"
          required
          title="Username should be a minimum of 6 characters and not more than 12 characters"
        />
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Get Started
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

const username = ref("");

const showError = ref({
  status: false,
  message: "",
});

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profile_image: "",
});

if (currentUser.value.id) {
  navigateTo("/");
}

const handle_submit = async () => {
  showError.value = {
    status: false,
    message: "",
  };
  try {
    const user = await $client.users.createUser.mutate({
      username: username.value,
      profile_image: `http://minepic.org/avatar/${username.value}/512`,
    });
    currentUser.value = {
      id: user.id,
      username: user.username,
      profile_image: user.profile_image,
    };
    navigateTo("/");
  } catch (e) {
    showError.value = {
      message: "Username already in use",
      status: true,
    };
  }
};
</script>
