<template>
  <div>
    Hi {{ username }}
    <button @click="handle_click">{{ loading ? "Loading" : "Follow" }}</button>
  </div>
</template>

<script lang="ts" setup>
const { $client } = useNuxtApp();

const { username } = useRoute().params;

const loading = ref(false);

const currentUser = useLocalStorage("user", {
  id: "",
  username: "",
  profileImage: "",
});

const get_user = async (username: string) => {
  const { data } = await $client.users.getByUserName.useQuery({ username });
  if (data.value && data.value.id) {
    return data.value.id;
  }
};

const handle_click = async () => {
  loading.value = true;
  $client.users.followUser.mutate({
    id: currentUser.value.id,
    friend_id: (await get_user(username as string)) ?? "",
  });
  loading.value = false;
};
</script>
