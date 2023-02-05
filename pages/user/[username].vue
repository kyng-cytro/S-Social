<template>
  <!-- Loading animation -->
  <Loading v-if="!user" />

  <!-- User Details View -->
  <div class="w-full max-w-4xl flex flex-col" v-if="user">
    <div
      class="border border-slate-300 bg-slate-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl mb-4 flex items-center justify-between px-6 py-6"
    >
      <div class="flex items-start flex-col space-y-2">
        <nuxt-img
          class="h-16 w-16 border-2 border-gray-400 rounded-full"
          :src="user.profileImage"
        />
        <h2 class="font-semibold">{{ user.username }}</h2>
        <div class="text-xs text-gray-500 dark:text-gray-400 space-x-3">
          <button class="tracking-tighter hover:underline" @click="tab = 1">
            {{ user._count.followers }} Followers
          </button>
          <button class="tracking-tighter hover:underline" @click="tab = 2">
            {{ user._count.following }} Following
          </button>
        </div>
      </div>
      <div
        class="flex items-center"
        v-if="currentUser && user.id != currentUser.id"
      >
        <button
          class="text-sm bg-black rounded-xl p-2 text-white"
          :class="following ? 'hover:bg-red-500' : 'hover:bg-gray-700'"
          @click="handle_follow"
        >
          {{ following ? "Unfollow" : "Follow" }}
        </button>
      </div>
    </div>

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

const { data: user, refresh: updateUser } =
  await $client.users.getByUserName.useQuery(
    {
      userName: username,
      full: true,
    },
    { lazy: true }
  );

const { data: following, refresh: updateFollow } =
  await $client.users.isFollowing.useQuery(
    {
      userId: currentUser.value.id,
      friendId: user.value ? user.value.id : "",
    },
    {
      lazy: true,
    }
  );

const handle_unfollow = async () => {
  loading.value = true;
  if (!user.value || !currentUser.value) return;
  try {
    await $client.users.unFollowUser.mutate({
      userId: currentUser.value.id,
      friendId: user.value.id,
    });
    updateUser();
    updateFollow();
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
    updateUser();
    updateFollow();
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};
</script>
