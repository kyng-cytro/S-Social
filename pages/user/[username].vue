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
    />

    <div class="flex flex-1 flex-col items-center">
      <!-- Nav -->
      <div
        class="text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <button
              @click="tab = 0"
              :class="
                tab == 0
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              "
            >
              Posts
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="tab = 1"
              :class="
                tab == 1
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              "
            >
              Followers
            </button>
          </li>
          <li class="mr-2">
            <button
              @click="tab = 2"
              :class="
                tab == 2
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              "
            >
              Following
            </button>
          </li>
        </ul>
      </div>

      <!-- List Box -->
      <div
        class="overflow-y-scroll hide-scroll-bar flex-1 w-full max-w-4xl p-3 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <!-- Posts -->
        <ol
          class="h-full divide-y-2 div divide-gray-400 dark:divide-gray-700"
          v-if="tab == 0"
        >
          <li v-for="post in user.posts">
            <NuxtLink
              :to="'/posts/' + post.id"
              class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
            >
              <div
                class="py-2 w-4/5 text-gray-600 dark:text-gray-400 space-y-1"
              >
                <div class="text-sm sm:text-base font-normal">
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    post.title
                  }}</span>
                </div>
                <p class="truncate text-xs sm:text-sm font-normal">
                  "{{ post.content }}"
                </p>
              </div>
            </NuxtLink>
          </li>
        </ol>

        <!-- Followers -->
        <ol
          class="h-full divide-y-2 div divide-gray-400 dark:divide-gray-700"
          v-if="tab == 1"
        >
          <li v-for="friend in user.followers">
            <NuxtLink
              :to="'/user/' + friend.follower.username"
              class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
            >
              <nuxt-img
                class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                :src="friend.follower.profileImage"
                :alt="friend.follower.username"
                placeholder
              />
              <div
                class="py-2 w-4/5 text-gray-600 dark:text-gray-400 space-y-1"
              >
                <div class="text-sm sm:text-base font-normal">
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    friend.follower.username
                  }}</span>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ol>

        <!-- Following -->
        <ol
          class="h-full divide-y-2 div divide-gray-400 dark:divide-gray-700"
          v-if="tab == 2"
        >
          <li v-for="friend in user.following">
            <NuxtLink
              :to="'/user/' + friend.following.username"
              class="items-center p-1 flex hover:bg-slate-100 dark:hover:bg-gray-700 rounded-md"
            >
              <nuxt-img
                class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                :src="friend.following.profileImage"
                :alt="friend.following.username"
                placeholder
              />
              <div
                class="py-2 w-4/5 text-gray-600 dark:text-gray-400 space-y-1"
              >
                <div class="text-sm sm:text-base font-normal">
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    friend.following.username
                  }}</span>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ol>
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
