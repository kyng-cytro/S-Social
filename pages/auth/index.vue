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
      <ButtonsNormal :loading="loading" text="Get Started" />
    </div>
  </form>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

const username = ref("");

const loading = ref(false);

const showError = ref({
  status: false,
  message: "",
});

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

if (currentUser.value.id) {
  navigateTo("/");
}

const handle_submit = async () => {
  loading.value = true;
  showError.value = {
    status: false,
    message: "",
  };
  try {
    const user = await $client.users.createUser.mutate({
      username: username.value,
      profileImage: `https://api.dicebear.com/5.x/adventurer/svg?seed=${username.value}`,
    });
    currentUser.value = {
      id: user.id,
      username: user.username,
      profileImage: user.profileImage,
    };
    loading.value = false;
    navigateTo("/");
  } catch (e) {
    showError.value = {
      message: "Username already in use",
      status: true,
    };
    loading.value = false;
  }
};
</script>
