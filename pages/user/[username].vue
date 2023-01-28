<template>
  <div>Hi {{ username }}</div>
</template>

<script lang="ts" setup>
const { username } = useRoute().params;
</script>
