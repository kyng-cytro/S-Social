<template>
  <form @submit.prevent="handle_submit" class="w-full max-w-lg">
    <p class="text-center text-sm text-red-500" v-show="showError.status">
      {{ showError.message }}
    </p>
    <div class="mb-6">
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Title</label
      >
      <input
        type="text"
        id="title"
        placeholder="How to ..."
        v-model="title"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label
        for="content"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Content</label
      >
      <textarea
        type="text"
        id="content"
        v-model="content"
        rows="4"
        required
        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-6">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isPrivate" class="sr-only peer" />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Private Post</span
        >
      </label>
    </div>

    <ButtonsNormal class="w-full" :loading="loading" text="Submit" />
  </form>
</template>

<script lang="ts" setup>
const loading = ref(false);

const { $client } = useNuxtApp();

const title = ref("");

const content = ref("");

const isPrivate = ref(false);

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

const showError = ref({
  status: false,
  message: "",
});

const handle_submit = async () => {
  console.log(title.value);
  loading.value = true;
  showError.value = {
    status: false,
    message: "",
  };
  try {
    await $client.posts.createPost.mutate({
      title: title.value,
      content: content.value,
      userId: currentUser.value.id,
      isPrivate: isPrivate.value,
    });
    loading.value = false;
    navigateTo("/");
  } catch (e) {
    showError.value = {
      status: true,
      message: "An error has occurred",
    };
    loading.value = false;
  }
};
</script>
