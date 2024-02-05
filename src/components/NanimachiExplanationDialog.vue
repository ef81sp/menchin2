<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { visibleNanimachiExplanation } from '@/composables/dialogController'
import type { AnalysisResult13 } from '@/utils/type'
import ExplanationBlocks from './ExplanationBlocks.vue'
import { computed } from 'vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import ExplanationSevenPairs from './ExplanationSevenPairs.vue'

const props = defineProps<{ analysisResult: AnalysisResult13 }>()

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
    <h4 class="my-4 md:text-2xl">{{ shanten }}</h4>
    <ExplanationBlocksSinglePaiList
      :title="yuukoText"
      :pai-list="props.analysisResult.有効牌"
    />
    <template
      v-if="
        props.analysisResult.analysisResult._5ブロック.シャンテン数 ===
        props.analysisResult.シャンテン数
      "
    >
      <h5 class="mt-16 md:text-xl">5ブロック</h5>
      <ExplanationBlocks
        v-for="(indivisual, i) in props.analysisResult.analysisResult._5ブロック.indivisuals"
        :indivisual="indivisual"
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
