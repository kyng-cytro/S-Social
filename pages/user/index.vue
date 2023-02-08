<template>
  <ClientOnly>
    <!-- Loading animation -->
    <Loading v-if="pending" />

    <Head>
      <Title>S-Social | Profile</Title>
    </Head>
    <!-- Container -->
    <div class="w-full max-w-4xl flex flex-col" v-if="user && !pending">
      <!-- User Details View -->
      <UserDetailsView
        :username="user.username"
        :profileImage="user.profileImage"
        :followers="user._count.followers"
        :following="user._count.following"
        :claimCode="user.claimCode"
        :logout="true"
        :follow="false"
        @handle_logout="handle_logout"
        @tab-to-1="tab = 1"
        @tab-to-2="tab = 2"
      />

      <!-- Tab View -->
      <div class="flex flex-1 flex-col items-center">
        <!-- Nav -->
        <UserTabNav
          :tab="tab"
          @tab-to-0="tab = 0"
          @tab-to-1="tab = 1"
          @tab-to-2="tab = 2"
        />

        <!-- Box -->
        <div
          class="overflow-y-scroll hide-scroll-bar flex-1 w-full max-w-4xl p-3 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <!-- Post s-->
          <UserTabListContainer v-if="tab == 0">
            <UserTabListPost
              :id="post.id"
              :title="post.title"
              :content="post.content"
              :key="post.id"
              v-for="post in user.posts"
            />
          </UserTabListContainer>

          <!-- Follower -->
          <UserTabListContainer v-if="tab == 1">
            <UserTabListUser
              :username="friend.follower.username"
              :profileImage="friend.follower.profileImage"
              :key="friend.follower.id"
              v-for="friend in user.followers"
            />
          </UserTabListContainer>

          <!-- Following -->
          <UserTabListContainer v-if="tab == 2">
            <UserTabListUser
              :username="friend.following.username"
              :profileImage="friend.following.profileImage"
              :key="friend.following.id"
              v-for="friend in user.following"
            />
          </UserTabListContainer>
        </div>
      </div>
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
