<script setup lang="ts">
import type { 牌 } from 'pairi'
import type { ExtractResult5ブロック } from 'pairi/dist/手牌utils/手牌utils.type'

import Divider from 'primevue/divider'
import ExplanationBlocksBlock from './ExplanationBlocksBlock.vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import { computed } from 'vue'
type Props = {
  シャンテン数: number
  ブロック: ExtractResult5ブロック
  有効牌: 牌[]
}

const props = defineProps<Props>()

const restList = computed(() => {
  const rest = props.ブロック.rest
  return Object.values(rest).flatMap((p) => p)
})
</script>
<template>
  <Divider />
  <div class="flex flex-col gap-y-2 lg:gap-y-4">
    <ExplanationBlocksBlock
      v-if="ブロック.雀頭 !== null"
      title="雀頭"
      :block-list="[ブロック.雀頭]"
    />
    <ExplanationBlocksBlock
      v-if="ブロック.面子.length !== 0"
      title="面子"
      :block-list="ブロック.面子"
    />
    <ExplanationBlocksBlock
      v-if="ブロック.塔子.length !== 0"
      title="塔子"
      :block-list="ブロック.塔子"
    />
    <ExplanationBlocksSinglePaiList
      v-if="restList.length !== 0"
      title="浮き"
      :pai-list="restList"
    />
    <ExplanationBlocksSinglePaiList
      :title="シャンテン数 === 0 ? '待ち' : '有効'"
      :pai-list="有効牌"
      class="mt-3 lg:mt-6"
    />
  </div>
</template>
