<script setup lang="ts">
import { computed } from 'vue'

import type { AnalysisResult13, NanimachiExplanation } from '@/utils/type'

import Dialog from 'primevue/dialog'
import ExplanationBlocks from './ExplanationBlocks.vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import ExplanationSevenPairs from './ExplanationSevenPairs.vue'

import { visibleNanimachiExplanation } from '@/composables/dialogController'
import { hand } from '@/composables/nanimachiHand'

const props = defineProps<{ analysisResult: AnalysisResult13 }>()

const shanten = computed(() =>
  props.analysisResult.シャンテン数 === 0
    ? '聴牌'
    : props.analysisResult.シャンテン数 + 'シャンテン',
)
const yuukoText = computed(() => (props.analysisResult.シャンテン数 === 0 ? '待ち' : '有効牌'))

const indivisualsStr = computed<NanimachiExplanation[]>(() => {
  const wholeResult = props.analysisResult.analysisResult._5ブロック.indivisuals.map(
    ({ ブロック, 有効牌 }) => {
      const yuuko = 有効牌.map((p) => p.toString())

      const _block = [ブロック.雀頭 ?? [], ...ブロック.面子, ...ブロック.塔子]
        .flat()
        .map((block) => {
          return block.component.map((p) => p.toString())
        })

      const _restList = Object.values(ブロック.rest).flat()
      const _rest = _restList.map((p) => [p.toString()])
      const block = [..._block, ..._rest].sort()
      return { yuuko, block }
    },
  )

  // シャンポン待ちが冗長なので、blockが同一のものをひとつにまとめ、yuukoはその全てをマージする
  const unionSame = wholeResult.reduce<NanimachiExplanation[]>((acc, cur) => {
    const index = acc.findIndex((a) => JSON.stringify(a.block) === JSON.stringify(cur.block))
    if (index === -1) {
      return [...acc, cur]
    }
    // yuukoはユニークにする
    acc[index].yuuko = Array.from(new Set([...acc[index].yuuko, ...cur.yuuko])).sort()

    return acc
  }, [])
  return unionSame
})
</script>
<template>
  <Dialog
    v-model:visible="visibleNanimachiExplanation"
    modal
    header="解説"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '640px': '100vw' }"
  >
    <h4 class="my-4 md:text-2xl">{{ shanten }}</h4>
    <ExplanationBlocksSinglePaiList
      :title="yuukoText"
      :pai-list="props.analysisResult.有効牌.map((p) => p.toString())"
    />

    <ExplanationBlocksSinglePaiList
      title="問題"
      :pai-list="hand.普通.map((p) => p.toString())"
      class="mt-6 md:mt-12"
    />

    <template
      v-if="
        props.analysisResult.analysisResult._5ブロック.シャンテン数 ===
        props.analysisResult.シャンテン数
      "
    >
      <h5 class="mt-8 md:mt-16 md:text-xl">5ブロック</h5>
      <ExplanationBlocks
        v-for="(indivisual, i) in indivisualsStr"
        :nanimachi-explanation="indivisual"
        :shanten="props.analysisResult.シャンテン数"
        :key="i"
      />
    </template>
    <template
      v-if="
        props.analysisResult.analysisResult.七対子.シャンテン数 ===
        props.analysisResult.シャンテン数
      "
    >
      <h5 class="mt-16 md:text-xl">七対子</h5>
      <ExplanationSevenPairs
        :analysis-result手牌13_7pairs="props.analysisResult.analysisResult.七対子"
      />
    </template>
  </Dialog>
</template>
