<template>
  <div
    class="w-full flex space-y-5 flex-col max-w-4xl p-5 mb-4 border border-slate-300 rounded-lg bg-slate-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col space-y-2 flex-1" v-if="post">
      <div class="mb-3 flex w-full justify-between items-center">
        <NuxtLink
          :to="'/user/' + post.author.username"
          class="flex items-center p-2 space-x-2 hover:dark:bg-slate-700 hover:bg-slate-300 max-w-max rounded-md"
        >
          <img
            class="w-8 h-8 rounded-full sm:mb-0 ring-2 ring-gray-300 dark:ring-gray-500"
            :src="post.author.profileImage"
            :alt="post.author.username"
          />
          <span class="text-lg font-semibold text-gray-900 dark:text-white">{{
            post.author.username
          }}</span>
        </NuxtLink>
      </div>
      <div class="flex-1 pl-2">
        <h3 class="font-bold text-lg mb-3">{{ post.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ post.content }}</p>
      </div>
    </div>

    <!-- Comment Form -->
    <form @submit.prevent="handle_submit">
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
    <div class="overflow-y-scroll">
      <span>Comments</span>
      <CommentHistory v-if="post">
        <Comment
          :name="post.author.username"
          :date="comment.createdAt"
          :text="comment.text"
          :src="post.author.profileImage"
          v-for="comment in post.comments"
        />
      </CommentHistory>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

let { id } = useRoute().params;

id = id as string;

const loading = ref(false);

const new_comment = ref("");

const { data: post } = await $client.posts.getById.useQuery({ id });

const handle_submit = async () => {};
</script>
