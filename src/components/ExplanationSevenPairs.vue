<script setup lang="ts">
import Divider from 'primevue/divider'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import { computed } from 'vue'
import type { AnalysisResult手牌13_7pairs } from '@/utils/type'

const props = defineProps<{ analysisResult手牌13_7pairs: AnalysisResult手牌13_7pairs }>()
const shanten = computed(() => props.analysisResult手牌13_7pairs.シャンテン数)
const yuuko = computed(() => props.analysisResult手牌13_7pairs.有効牌)
</script>
<template>
  <Divider />
  <div class="flex flex-col gap-y-2 lg:gap-y-4">
    <ExplanationBlocksSinglePaiList
      :title="shanten === 0 ? '待ち' : '有効'"
      :pai-list="yuuko"
      class="mt-3 lg:mt-6"
    />
  </div>
</template>
