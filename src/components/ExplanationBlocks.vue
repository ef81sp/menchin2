<script setup lang="ts">
import Divider from 'primevue/divider'
import ExplanationBlocksBlock from './ExplanationBlocksBlock.vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import { computed } from 'vue'
import type { AnalysisResult手牌13_5 } from '@/utils/type'

const props = defineProps<{ indivisual: AnalysisResult手牌13_5 }>()
const block = computed(() => props.indivisual.ブロック)
const shanten = computed(() => props.indivisual.シャンテン数)
const yuuko = computed(() => props.indivisual.有効牌)
const restList = computed(() => {
  const rest = props.indivisual.ブロック.rest
  return Object.values(rest).flatMap((p) => p)
})
</script>
<template>
  <Divider />
  <div class="flex flex-col gap-y-2 lg:gap-y-4">
    <ExplanationBlocksBlock
      v-if="block.雀頭 !== null"
      title="雀頭"
      :block-list="[block.雀頭]"
    />
    <ExplanationBlocksBlock
      v-if="block.面子.length !== 0"
      title="面子"
      :block-list="block.面子"
    />
    <ExplanationBlocksBlock
      v-if="block.塔子.length !== 0"
      title="搭子"
      :block-list="block.塔子"
    />
    <ExplanationBlocksSinglePaiList
      v-if="restList.length !== 0"
      title="浮き"
      :pai-list="restList"
    />
    <ExplanationBlocksSinglePaiList
      :title="shanten === 0 ? '待ち' : '有効'"
      :pai-list="yuuko"
      class="mt-3 lg:mt-6"
    />
  </div>
</template>
