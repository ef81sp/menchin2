<script setup lang="ts">
import Divider from 'primevue/divider'
import ExplanationBlocksBlock from './ExplanationBlocksBlock.vue'
import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import type { NanimachiExplanation } from '@/utils/type'

const props = defineProps<{ nanimachiExplanation: NanimachiExplanation; shanten: number }>()
</script>
<template>
  <Divider />
  <div class="flex flex-col gap-y-2 lg:gap-y-4">
    <ExplanationBlocksBlock
      title=""
      :block-list="props.nanimachiExplanation.block"
    />
    <ExplanationBlocksSinglePaiList
      :title="shanten === 0 ? '待ち' : '有効'"
      :pai-list="props.nanimachiExplanation.yuuko"
      class="mt-3 lg:mt-6"
    />
  </div>
</template>
