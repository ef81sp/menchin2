<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="text-center text-sm">
    <RouterLink to="/">何待ち</RouterLink> | <RouterLink to="/nanikiru">何切る</RouterLink> |
    <RouterLink to="/help">ヘルプ</RouterLink>
  </nav>
  <RouterView />
</template>
