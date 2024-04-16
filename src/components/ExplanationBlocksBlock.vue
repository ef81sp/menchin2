<script setup lang="ts">
import { computed } from 'vue'
import VPai from './VPai.vue'
import type { StrPai } from '@/utils/type'
import ExplanationBlocksBlockCaption from './ExplanationBlocksBlockCaption.vue'
const props = defineProps<{
  title: string
  blockList: StrPai[][]
}>()

const blockListWithInfo = computed<
  {
    block: StrPai[]
    type: '面子' | '搭子' | '対子' | '雀頭' | '孤立'
  }[]
>(() => {
  const toitsuCount = props.blockList.filter(
    (block) => block.length === 2 && block[0] === block[1],
  ).length
  return props.blockList.map((block) => {
    if (block.length === 3) {
      return { block, type: '面子' }
    }
    if (block.length === 2) {
      if (block[0] === block[1]) {
        return toitsuCount === 1 ? { block, type: '雀頭' } : { block, type: '対子' }
      }
      return { block, type: '搭子' }
    }

    return { block, type: '孤立' }
  })
})
</script>
<template>
  <div class="flex gap-x-2 lg:gap-x-4">
    <!-- <p class="flex min-w-fit items-center text-sm md:text-base lg:text-lg">{{ title }}</p> -->
    <div class="md:4 flex flex-wrap items-center gap-3">
      <div
        class="flex flex-col"
        v-for="({ block, type }, i) in blockListWithInfo"
        :key="i"
      >
        <div class="flex justify-center">
          <VPai
            v-for="(p, i) in block"
            :pai-str="p"
            :key="i"
            class="w-5 md:w-8 lg:w-10"
          />
        </div>
        <ExplanationBlocksBlockCaption :type />
      </div>
    </div>
  </div>
</template>
