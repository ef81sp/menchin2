<script setup lang="ts">
import type { PaiStr } from '@/composables/PaiStr.type'
import VPai from './VPai.vue'
defineProps<{
  title: string
  paiList: PaiStr[]
}>()
</script>
<template>
  <div class="flex items-center gap-x-2 lg:gap-x-4">
    <p class="flex min-w-fit items-center text-sm md:text-base lg:text-lg">{{ title }}</p>
    <div class="flex flex-wrap">
      <VPai
        v-for="(p, i) in paiList"
        :pai-str="p"
        :key="i"
        class="w-5 md:w-8 lg:w-10"
      />
    </div>
  </div>
</template>
