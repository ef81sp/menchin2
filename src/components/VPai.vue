<script setup lang="ts">
import type { 牌 } from 'pairi'
import { computed } from 'vue'

const props = defineProps<{
  paiStr: ConstructorParameters<typeof 牌>[0]
}>()

const src = computed(() => '/pai-images/' + props.paiStr + '.gif')
</script>

<template>
  <!-- なんか短縮記法(:srcとだけ書くやつ)がTSに怒られる -->
  <img
    :src="src"
    :alt="paiStr"
    class="shadow-lg"
  />
</template>
