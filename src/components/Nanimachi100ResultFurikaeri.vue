<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'

import type { PaiStr } from '@/composables/PaiStr.type'
import type { 手牌 } from 'pairi'

import ExplanationBlocksSinglePaiList from './ExplanationBlocksSinglePaiList.vue'
import { computed } from 'vue'

export type Nanimachi100ResultFurikaeriProps = {
  hand: 手牌
  answer: PaiStr[]
  index: number
  timeMs: number
  mistake: boolean
}
const { hand: _hand, answer, index, mistake } = defineProps<Nanimachi100ResultFurikaeriProps>()
defineEmits<{ 'show-explaination': [] }>()

const hand = computed(() => _hand.牌List().map((p) => p.toString()))
</script>

<template>
  <li>
    <div
      class="flex items-center gap-2 px-0 py-4 md:gap-8 md:px-4"
      :class="mistake ? ['bg-red-50', 'border-red-600', 'border'] : []"
    >
      <div class="flex w-16 flex-col items-center md:w-20">
        <p class="text-sm md:text-base">
          Q{{ index + 1 }}
          <span
            v-if="mistake"
            class="rounded border border-red-600 px-1 text-xs text-red-950"
          >
            誤
          </span>
        </p>
        <p class="text-sm md:text-base">{{ (timeMs / 1000).toFixed(1) }}秒</p>
        <Button
          size="small"
          class="text-xs"
          :pt="{
            root: '!py-1',
          }"
          :pt-options="{ mergeProps: true, mergeSections: true }"
          @click="$emit('show-explaination')"
          >解説</Button
        >
      </div>
      <div>
        <ExplanationBlocksSinglePaiList
          title="問題"
          :pai-list="hand"
        />

        <ExplanationBlocksSinglePaiList
          title="待ち"
          :pai-list="answer"
          class="mt-3"
        />
      </div>
    </div>
    <hr />
  </li>
</template>
