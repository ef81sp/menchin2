<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { visibleNanimachiExplanation } from '@/composables/dialogController'
import type { AnalysisResult手牌13 } from 'pairi/dist/手牌utils/analyze手牌'
import ExplanationBlocks from './ExplanationBlocks.vue'
import { computed } from 'vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'

const analysis = defineProps<AnalysisResult手牌13>()

const shanten = computed(() =>
  analysis._5ブロック.シャンテン数 === 0 ? '聴牌' : analysis._5ブロック.シャンテン数 + 'シャンテン',
)
const yuukoText = computed(() => (analysis._5ブロック.シャンテン数 === 0 ? '待ち' : '有効牌'))
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
    <h4 class="my-4 md:text-2xl">5ブロック {{ shanten }}</h4>
    <ExplanationBlocksSinglePaiList
      :title="yuukoText"
      :pai-list="analysis._5ブロック.有効牌"
    />
    <ExplanationBlocks
      v-for="(indivisual, i) in analysis._5ブロック.indivisuals"
      v-bind="indivisual"
      :key="i"
    />
  </Dialog>
</template>
