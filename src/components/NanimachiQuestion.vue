<script setup lang="ts">
import VPai from '@/components/VPai.vue'
import type { 手牌 } from 'pairi'

defineProps<{ hand: 手牌['普通'] }>()
</script>

<template>
  <div class="flex my-4 *:w-[calc(100%/14)]">
    <VPai
      :pai-str="pai.toString()"
      v-for="(pai, i) in hand"
      :key="i"
      class="sm:w-10 md:w-12 lg:w-14"
    />
  </div>
</template>
