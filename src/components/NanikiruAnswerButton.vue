<script setup lang="ts">
import { 手牌 } from 'pairi'
import VPai from './VPai.vue'
import { type PaiStr } from '@/composables/PaiStr.type'
import { computed } from 'vue'

const props = defineProps<{
  hand: 手牌
}>()

const paiList = computed(() => props.hand.牌ListExcludesツモ())
const tsumo = computed(() => {
  if (props.hand.ツモ === null) {
    throw new Error('ツモがnull')
  }
  return props.hand.ツモ
})

const answer = defineModel<PaiStr | 'tsumo' | null>()
const handleClick = (p: PaiStr) => {
  answer.value = p
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
    <div class="flex flex-row">
      <button
        v-for="(p, i) in paiList.map((p) => p.toString())"
        :key="i"
        class="hover:-translate-y-2 focus:-translate-y-2 md:hover:-translate-y-3 md:focus:-translate-y-3"
        @click="handleClick(p)"
      >
        <VPai
          :pai-str="p"
          class="w-8 sm:w-10 md:w-12 lg:w-14"
        />
      </button>
      <button
        class="ml-3 hover:-translate-y-2 focus:-translate-y-2 md:hover:-translate-y-3 md:focus:-translate-y-3"
        @click="handleClick(tsumo.toString())"
      >
        <VPai
          :pai-str="tsumo.toString()"
          class="w-8 sm:w-10 md:w-12 lg:w-14"
        />
      </button>
    </div>
  </div>
</template>
