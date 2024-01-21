<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { visibleNanimachiExplanation } from '@/composables/dialogController'
import type { AnalysisResult13 } from '@/utils/type'
import ExplanationBlocks from './ExplanationBlocks.vue'
import { computed } from 'vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'

type AnalysisResult手牌13_5 = AnalysisResult13['analysisResult']['_5ブロック']

const props = defineProps<{ analysisResult: AnalysisResult手牌13_5 }>()

const shanten = computed(() =>
  props.analysisResult.シャンテン数 === 0
    ? '聴牌'
    : props.analysisResult.シャンテン数 + 'シャンテン',
)
const yuukoText = computed(() => (props.analysisResult.シャンテン数 === 0 ? '待ち' : '有効牌'))
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
      :pai-list="props.analysisResult.有効牌"
    />
    <ExplanationBlocks
      v-for="(indivisual, i) in props.analysisResult.indivisuals"
      v-bind="indivisual"
      :key="i"
    />
  </Dialog>
</template>
