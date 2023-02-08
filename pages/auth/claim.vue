<template>
  <Head>
    <Title>S-Social | Login</Title>
  </Head>
  <form
    @submit.prevent="handle_claim"
    class="flex flex-col justify-center space-y-5 items-center"
  >
    <h2>Paste Your Recovery Code</h2>
    <p class="text-sm text-red-500" v-show="showError.status">
      {{ showError.message }}
    </p>
    <div class="w-full">
      <div class="flex">
        <span
          class="font-serif inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
        >
          <svg
            stroke="currentColor"
            fill="none"
            class="w-6 h-6 text-gray-400"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          id="code"
          v-model="code"
          class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="cld..."
          required
        />
      </div>
    </div>
    <ButtonsNormal :loading="loading" text="Claim Account" />
  </form>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

const code = ref("");

const showError = ref({
  status: false,
  message: "",
});

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

const loading = ref(false);

const handle_claim = async () => {
  loading.value = true;
  try {
    const { data: user } = await $client.users.claimAccount.useQuery({
      code: code.value,
    });

    if (user.value) {
      currentUser.value = {
        id: user.value.id,
        profileImage: user.value.profileImage,
        username: user.value.username,
      };
      navigateTo("/user");
    } else {
      showError.value = {
        status: true,
        message: "Invalid Code",
      };
    }
    loading.value = false;
  } catch (e) {
    showError.value = {
      status: true,
      message: "An Error Occurred",
    };
    loading.value = false;
  }
};
</script>
