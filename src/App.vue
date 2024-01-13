<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="text-sm text-center">
    <RouterLink to="/">何待ち</RouterLink> |
    <RouterLink to="/nanikiru">何切る</RouterLink>
  </nav>

  <RouterView />
</template>
