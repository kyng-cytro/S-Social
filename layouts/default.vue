<template>
  <div
    class="font-mono min-h-screen w-full flex flex-col text-black dark:text-white items-center bg-slate-100 dark:bg-slate-800 p-6 sm:p-10"
  >
    <Navbar class="mb-5" :current="currentRoute" />
    <div class="h-full flex-1 w-full flex justify-center">
      <NuxtPage />
    </div>
    <Footer class="mt-5" />
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script lang="ts" setup>
import { init } from "commandbar";
import { Post } from "@prisma/client";

const { $client } = useNuxtApp();
const route = useRoute();
const currentRoute = ref("");

watch(route, (to) => (currentRoute.value = to.path));

const { data: users } = $client.users.getAllUsers.useQuery();

const deletePost = async ({ record }: any) => {
  const post = record as Post;
  await $client.posts.deletePost.mutate({ postId: post.id });
  useRouter().go();
};

onMounted(async () => {
  const currentUser = useLocalStorage("user", {
    id: "",
    username: "",
    profileImage: "",
  });

  const { data: posts } = await $client.posts.getByAuthor.useQuery({
    authorId: currentUser.value.id,
  });

  //TODO: use environment variable
  init("cbc9e276");

  const loggedInUserId = currentUser.value.id;

  window.CommandBar.boot(loggedInUserId).then(() => {
    window.CommandBar.addRouter(useRouter().push);

    window.CommandBar.addCallback("delete_post", deletePost);

    if (users.value) {
      window.CommandBar.addRecords("users", users.value);
    }

    if (posts.value) {
      window.CommandBar.addRecords("posts", posts.value);
    }
  });
});
</script>
