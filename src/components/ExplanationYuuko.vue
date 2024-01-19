<script setup lang="ts">
import type { AnalysisResult13 } from '@/utils/type'
import type { 牌 } from 'pairi'

import Divider from 'primevue/divider'
import VPai from './VPai.vue'
import { computed } from 'vue'
import { sumRemaining有効牌num } from '@/utils/sumRemaining有効牌num'

const props = defineProps<{
  analysisResult: AnalysisResult13
  discarding: 牌
  hand: 牌[]
}>()

const remaining有効牌num = computed(() =>
  Array.from(props.analysisResult.remaining有効牌num.values()).filter(
    ({ remains }) => remains !== 0,
  ),
)
const nShuNPai = computed(
  () =>
    `${remaining有効牌num.value.length}種${sumRemaining有効牌num(props.analysisResult.remaining有効牌num)}枚`,
)
</script>
<template>
  <Divider />
  <div class="flex flex-wrap items-center">
    <h5 class="mt-3 text-lg font-bold">
      打
      <VPai
        :pai-str="discarding.toString()"
        class="inline-block w-5 md:w-8 lg:w-11"
      />
      {{ nShuNPai }}
    </h5>
  </div>
  <h6 class="mt-3 font-bold">手牌</h6>
  <div class="flex flex-wrap items-center">
    <VPai
      :pai-str="pai.toString()"
      v-for="(pai, i) in hand"
      :key="i"
      class="w-5 sm:w-7 md:w-9 lg:w-11"
    />
  </div>
  <h6 class="mt-3 font-bold">有効牌</h6>
  <div class="flex flex-wrap items-center">
    <div
      v-for="({ 牌, remains }, i) in remaining有効牌num"
      :key="i"
      class="w-5 sm:w-7 md:w-9 lg:w-11"
    >
      <VPai :pai-str="牌.toString()" />
      <p class="text-center">{{ remains }}</p>
    </div>
  </div>
</template>
