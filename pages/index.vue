<template>
  <Head>
    <Title>S-Social | Home</Title>
  </Head>
  <!-- Loading animation -->
  <Loading v-if="pending" />
  <!-- Post View -->
  <PostViewDayLayout v-else v-show="data && data.length > 0">
    <PostLayout
      :id="item.id"
      :title="item.title"
      :content="item.content"
      :username="item.author.username"
      :profile_image="item.author.profileImage"
      :is_private="item.isPrivate"
      v-for="item in data"
    />
  </PostViewDayLayout>

  <!-- No Data -->
  <div
    class="flex flex-col justify-center space-y-3"
    v-if="!pending"
    v-show="data && data.length < 1"
  >
    <p>Nothing to show</p>
    <NuxtLink
      to="/posts/add"
      type="button"
      class="text-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Add Post
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
const { $client } = useNuxtApp();

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

if (!currentUser.value.id) {
  navigateTo("/auth");
}

const { data, pending } = await $client.posts.getByAuthor.useQuery(
  { authorId: currentUser.value.id },
  {
    lazy: true,
  }
);
</script>
