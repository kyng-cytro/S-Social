<template>
  <!-- Loading animation -->
  <Loading v-if="!user && pending" />

  <!-- Container -->
  <div class="w-full max-w-4xl flex flex-col" v-if="user">
    <!-- User Details View -->
    <UserDetailsView
      :username="user.username"
      :profileImage="user.profileImage"
      :followers="user._count.followers"
      :following="user._count.following"
      :user_id="currentUser.id"
      :friend_id="user.id"
      :logout="false"
      :follow="true"
      :is_following="is_following ? true : false"
      :loading="loading"
      @handle_follow="handle_click"
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
    title="User Not Found"
    buttonText="Go Home"
    v-if="!user && !pending"
    @navigate="navigateTo('/')"
  />
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

let { username } = useRoute().params;

username = username as string;

const loading = ref(false);

const tab = ref(0);

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

const {
  data: user,
  pending,
  refresh: updateUser,
} = await $client.users.getByUserName.useQuery(
  {
    userName: username,
    full: true,
  },
  { lazy: true }
);

const { data: is_following, refresh: updateRelation } =
  await $client.users.isFollowing.useQuery(
    {
      userId: currentUser.value.id,
      friend: username,
    },
    {
      lazy: true,
      server: false,
    }
  );

const handle_click = () => {
  if (is_following.value) {
    handle_unfollow();
  } else {
    handle_follow();
  }
};

const handle_unfollow = async () => {
  loading.value = true;
  if (!user.value || !currentUser.value) return;
  try {
    await $client.users.unFollowUser.mutate({
      userId: currentUser.value.id,
      friendId: user.value.id,
    });
    await updateUser();
    await updateRelation();
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

const handle_follow = async () => {
  loading.value = true;
  if (!user.value || !currentUser.value) return;
  try {
    await $client.users.followUser.mutate({
      userId: currentUser.value.id,
      friendId: user.value.id,
    });
    await updateUser();
    await updateRelation();
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};
</script>
