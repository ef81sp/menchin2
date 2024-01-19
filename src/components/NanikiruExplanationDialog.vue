<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { visibleNanikiruExplanation } from '@/composables/dialogController'
import { computed } from 'vue'
import type { AnalysisResult14 } from '@/utils/type'
import { isTsumo } from '@/utils/isTsumo'
import type { 牌 } from 'pairi'
import { sortAnalysisResult14 } from '@/utils/sortAnalysisResult14'
import ExplanationYuuko from './ExplanationYuuko.vue'

const props = defineProps<{
  analysisResult: AnalysisResult14
  tsumo: 牌
  hand: 牌[]
}>()
const _analysisResultValues = computed(() =>
  sortAnalysisResult14(props.analysisResult).map(([, v]) => v),
)

const _isTsumo = computed(() => isTsumo(props.analysisResult, props.tsumo))
const shanten = computed(() => {
  return Math.min(..._analysisResultValues.value.map((a) => a.analysisResult.シャンテン数))
})

const minShantenAnalysisResultValues = computed(() =>
  _analysisResultValues.value.filter((a) => a.analysisResult.シャンテン数 === shanten.value),
)

const statusText = computed(() =>
  _isTsumo.value ? '和了' : shanten.value === 0 ? 'テンパイ' : shanten.value + 'シャンテン',
)

// handから指定した牌を除外して返す関数
const removePai = (hand: 牌[], pai: 牌) => {
  const index = hand.findIndex((p) => p.toEqual(pai))
  if (index === -1) {
    throw new Error('手牌に指定した牌が見つからない')
  }
  const newHand = [...hand]
  newHand.splice(index, 1)
  return newHand
}
</script>
<template>
  <Dialog
    v-model:visible="visibleNanikiruExplanation"
    modal
    header="解説"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '640px': '100vw' }"
  >
    <h4 class="my-4 md:text-2xl">{{ statusText }}</h4>
    <ExplanationYuuko
      v-for="(analysisResult, i) in minShantenAnalysisResultValues"
      :key="i"
      :analysis-result="analysisResult.analysisResult"
      :discarding="analysisResult.打牌"
      :hand="removePai(props.hand, analysisResult.打牌)"
    />
  </Dialog>
</template>
