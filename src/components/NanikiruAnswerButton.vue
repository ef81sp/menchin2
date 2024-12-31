<script setup lang="ts">
import Button from 'primevue/button'
import { 手牌 } from 'pairi'
import VPai from './VPai.vue'
import { type PaiStr } from '@/composables/PaiStr.type'
import { computed, ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'

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
watch(
  () => props.hand,
  () => {
    selected.value = null
  },
)
const handleClick = (p: PaiStr | 'tsumo', i: number | null = null) => {
  selected.value = i
  answer.value = p
}

const getPaiStr = (num: number): [p: PaiStr, i: number] => {
  let p: PaiStr | undefined
  let i: number | undefined
  p = paiList.value.find((p) => p.number === num)?.toString()
  if (p === undefined) {
    if (props.hand.ツモ?.number === num) {
      p = tsumo.value.toString()
      i = 14
    } else {
      throw new Error('牌が見つかりません')
    }
  } else {
    i = paiList.value.findIndex((p) => p.number === num)
  }
  return [p, i]
}
const setAnswer = (num: number | 'tsumo') => {
  if (num === 'tsumo') {
    answer.value = 'tsumo'
    selected.value = null
    return
  }
  // 数字がhandにない場合は何もしない
  if (paiList.value.findIndex((p) => p.number === num) === -1) {
    return
  }
  ;[answer.value, selected.value] = getPaiStr(num)
}

// prettier-ignore
const {
  digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9,
  numpad1, numpad2, numpad3, numpad4, numpad5, numpad6, numpad7, numpad8, numpad9,
  t
} = useMagicKeys()
watch(digit1, (v) => {
  if (v) setAnswer(1)
})
watch(digit2, (v) => {
  if (v) setAnswer(2)
})
watch(digit3, (v) => {
  if (v) setAnswer(3)
})
watch(digit4, (v) => {
  if (v) setAnswer(4)
})
watch(digit5, (v) => {
  if (v) setAnswer(5)
})
watch(digit6, (v) => {
  if (v) setAnswer(6)
})
watch(digit7, (v) => {
  if (v) setAnswer(7)
})
watch(digit8, (v) => {
  if (v) setAnswer(8)
})
watch(digit9, (v) => {
  if (v) setAnswer(9)
})
watch(numpad1, (v) => {
  if (v) setAnswer(1)
})
watch(numpad2, (v) => {
  if (v) setAnswer(2)
})
watch(numpad3, (v) => {
  if (v) setAnswer(3)
})
watch(numpad4, (v) => {
  if (v) setAnswer(4)
})
watch(numpad5, (v) => {
  if (v) setAnswer(5)
})
watch(numpad6, (v) => {
  if (v) setAnswer(6)
})
watch(numpad7, (v) => {
  if (v) setAnswer(7)
})
watch(numpad8, (v) => {
  if (v) setAnswer(8)
})
watch(numpad9, (v) => {
  if (v) setAnswer(9)
})
watch(t, (v) => {
  if (v) {
    console.log('t')
    setAnswer('tsumo')
  }
})
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
    label="ツモ [t]"
    class="w-24"
    @click="handleClick('tsumo')"
  />
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(to bottom, rgb(16, 185, 129), rgba(16, 185, 129, 0.5));
}
</style>
