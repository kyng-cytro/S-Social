<template>
  <!-- Loading animation  NOTE: user !post and not pending here because of refresh -->
  <Loading v-if="!post" />

  <!-- Post Details View -->
  <div class="w-full flex space-y-5 flex-col max-w-4xl mb-4" v-if="post">
    <div class="flex flex-col space-y-2 flex-1">
      <div class="mb-3 flex w-full justify-between items-center">
        <!-- User Modal -->
        <NuxtLink
          :to="'/user/' + post.author.username"
          class="flex items-center p-2 space-x-2 hover:dark:bg-slate-700 hover:bg-slate-300 max-w-max rounded-md"
        >
          <nuxt-img
            class="w-8 h-8 rounded-full sm:mb-0 ring-2 ring-gray-300 dark:ring-gray-500"
            :src="post.author.profileImage"
            :alt="post.author.username"
            placeholder
          />
          <span class="text-lg font-semibold text-gray-900 dark:text-white">{{
            post.author.username
          }}</span>
        </NuxtLink>
        <!-- Edit & update  -->
        <div class="flex space-x-2" v-if="post.author.id == currentUser.id">
          <!-- Edit Button -->
          <NuxtLink
            :to="'/posts/edit/' + post.id"
            class="p-2 hover:dark:bg-slate-700 hover:bg-slate-300 rounded-full"
            title="Edit Post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              class="h-5 w-5 dark:text-slate-300"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"
              ></path>
            </svg>
          </NuxtLink>
          <!-- Delete Button -->
          <button
            class="p-2 hover:dark:bg-slate-700 hover:bg-slate-300 rounded-full"
            title="Delete Post"
            @click="delete_post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              class="h-5 w-5 dark:text-slate-50"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-1 pl-2">
        <h3 class="font-bold text-lg mb-3">{{ post.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ post.content }}</p>
      </div>
    </div>

    <!-- Comment Form -->
    <form @submit.prevent="handle_submit" v-if="currentUser.id">
      <p
        class="text-center text-sm text-red-500 mb-2"
        v-show="showError.status"
      >
        {{ showError.message }}
      </p>
      <div class="mb-6">
        <textarea
          type="text"
          id="content"
          v-model="new_comment"
          rows="2"
          placeholder="funny stu..."
          required
          class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <ButtonsNormal class="w-full" :loading="loading" text="Comment" />
    </form>

    <!-- Comment History -->
    <div class="h-60 overflow-y-scroll hide-scroll-bar hide-scroll-bar">
      <span>Comments</span>
      <CommentHistory v-if="post">
        <Comment
          :name="comment.author.username"
          :date="comment.createdAt"
          :text="comment.text"
          :src="comment.author.profileImage"
          v-for="comment in post.comments"
        />
      </CommentHistory>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

let { id } = useRoute().params;

const loading = ref(false);

const new_comment = ref("");

const { data: post, refresh } = await $client.posts.getById.useQuery(
  { postId: id as string },
  { lazy: true }
);

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
  showError.value = {
    status: false,
    message: "",
  };
  loading.value = true;
  try {
    await $client.posts.addComment.mutate({
      postId: id as string,
      text: new_comment.value,
      userId: currentUser.value.id,
    });
    refresh();
    new_comment.value = "";
    loading.value = false;
  } catch (e) {
    showError.value = {
      status: true,
      message: "Something went wrong",
    };
    loading.value = false;
  }
};

const delete_post = async () => {
  if (
    confirm("Delete post?") &&
    post.value &&
    currentUser.value.id == post.value.author.id
  ) {
    await $client.posts.deletePost.mutate({ postId: id as string });
    navigateTo("/");
  }
};
</script>
