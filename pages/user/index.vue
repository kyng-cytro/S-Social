<template>
  <ClientOnly>
    <!-- Loading animation -->
    <Loading v-if="pending" />

    <!-- Container -->
    <div class="w-full max-w-4xl flex flex-col" v-if="user && !pending">
      <!-- User Details View -->
      <UserDetailsView
        :username="user.username"
        :profileImage="user.profileImage"
        :followers="user._count.followers"
        :following="user._count.following"
        :logout="true"
        :follow="false"
        @handle_logout="handle_logout"
      />
    </div>

    <!-- No User -->
    <UserNoUser
      title="Not Signed In"
      buttonText="Sign In"
      v-if="!pending && !user"
      @navigate="handle_clear_user"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

const tab = ref(0);

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

const { data: user, pending } = await $client.users.getByUserName.useQuery(
  {
    userName: currentUser.value.username,
    full: true,
  },
  { lazy: true }
);

const handle_logout = () => {
  if (confirm("Are you sure you want to log out")) {
    handle_clear_user();
    navigateTo("/auth");
  }
};

const handle_clear_user = () => {
  currentUser.value = { id: "", username: "", profileImage: "" };
};
</script>
