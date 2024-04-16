<script setup lang="ts">
import { computed } from 'vue'
import VPai from './VPai.vue'
import type { StrPai } from '@/utils/type'
import ExplanationBlocksBlockCaption from './ExplanationBlocksBlockCaption.vue'

import { length } from '@/composables/nanimachiOption'
const props = defineProps<{
  title: string
  blockList: StrPai[][]
}>()

const needBlockNum = computed(() => {
  switch (length.value) {
    case 7:
      return 3
    case 10:
      return 4
    case 13:
      return 5
    default:
      throw new Error('Invalid length')
  }
})
const toitsuCount = computed(
  () => props.blockList.filter((block) => block.length === 2 && block[0] === block[1]).length,
)
const mentsuCount = computed(() => props.blockList.filter((block) => block.length === 3).length)
const blockCount = computed(() => props.blockList.filter((block) => block.length >= 2).length)
const blockListWithInfo = computed<
  {
    block: StrPai[]
    type: '面子' | '搭子' | '対子' | '雀頭' | '単騎' | 'くっつき' | '不要'
  }[]
>(() => {
  return props.blockList.map((block) => {
    if (block.length === 3) {
      return { block, type: '面子' }
    }
    if (block.length === 2) {
      if (block[0] === block[1]) {
        return toitsuCount.value === 1 ? { block, type: '雀頭' } : { block, type: '対子' }
      }
      return { block, type: '搭子' }
    }

    // 孤立牌の扱い
    if (mentsuCount.value === needBlockNum.value - 1) {
      return { block, type: '単騎' }
    }
    if (blockCount.value === needBlockNum.value) {
      return { block, type: '不要' }
    } else return { block, type: 'くっつき' }
  })
})
</script>
<template>
  <div class="flex gap-x-2 lg:gap-x-4">
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
