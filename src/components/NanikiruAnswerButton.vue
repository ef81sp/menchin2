<script setup lang="ts">
import Button from 'primevue/button'
import { 手牌 } from 'pairi'
import VPai from './VPai.vue'
import { type PaiStr } from '@/composables/PaiStr.type'
import { computed, ref, watch } from 'vue'

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
const selected = ref<number | null>(null)
watch(props.hand, () => {
  selected.value = null
})
const handleClick = (p: PaiStr | 'tsumo', i: number | null = null) => {
  selected.value = i
  answer.value = p
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
    <div class="flex flex-row">
      <button
        v-for="(p, i) in paiList.map((p) => p.toString())"
        :class="{
          'gradient-bg': selected === i,
        }"
        :key="i"
        @click="handleClick(p, i)"
      >
        <VPai
          :pai-str="p"
          class="w-8 hover:-translate-y-3 focus:-translate-y-3 sm:w-10 md:w-12 md:hover:-translate-y-4 md:focus:-translate-y-4 lg:w-14"
          :class="[selected === i ? '-translate-y-3 md:-translate-y-4' : '']"
        />
      </button>
      <button
        @click="handleClick(tsumo.toString(), 14)"
        class="ml-3"
        :class="{
          'gradient-bg': selected === 14,
        }"
      >
        <VPai
          :pai-str="tsumo.toString()"
          class="w-8 hover:-translate-y-3 focus:-translate-y-3 sm:w-10 md:w-12 md:hover:-translate-y-4 md:focus:-translate-y-4 lg:w-14"
          :class="[selected === 14 ? '-translate-y-3 md:-translate-y-4' : '']"
        />
      </button>
    </div>
  </div>
  <Button
    label="ツモ"
    class="w-24"
    @click="handleClick('tsumo')"
  />
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(to bottom, rgb(16, 185, 129), rgba(16, 185, 129, 0.5));
}
</style>
