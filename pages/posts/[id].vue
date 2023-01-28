<template>
  <div>Post by ID {{ id }}</div>
</template>

<script lang="ts" setup>
const { id } = useRoute().params;
</script>
