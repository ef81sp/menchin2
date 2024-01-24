<script setup lang="ts">
import VPai from './VPai.vue'
import type { 牌 } from 'pairi'
defineProps<{
  title: string
  paiList: 牌[]
}>()
</script>
<template>
  <div class="flex items-center gap-x-2 lg:gap-x-4">
    <p class="flex min-w-fit items-center text-sm md:text-base lg:text-lg">{{ title }}</p>
    <div class="flex flex-wrap">
      <VPai
        v-for="(p, i) in paiList.map((p) => p.toString())"
        :pai-str="p"
        :key="i"
        class="w-5 md:w-8 lg:w-11"
      />
    </div>
  </div>
</template>
