<script setup lang="ts">
import VPai from './VPai.vue'
import type { StrPai } from '@/utils/type'
defineProps<{
  title: string
  blockList: StrPai[][]
}>()
</script>
<template>
  <div class="flex gap-x-2 lg:gap-x-4">
    <!-- <p class="flex min-w-fit items-center text-sm md:text-base lg:text-lg">{{ title }}</p> -->
    <div class="flex flex-wrap items-center gap-2 lg:gap-4">
      <div
        class="flex"
        v-for="(paiStrList, i) in blockList"
        :key="i"
      >
        <VPai
          v-for="(p, i) in paiStrList"
          :pai-str="p"
          :key="i"
          class="w-5 md:w-8 lg:w-11"
        />
      </div>
    </div>
  </div>
</template>
