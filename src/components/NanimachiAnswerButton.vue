<script setup lang="ts">
import { suit, type Suit } from '@/composables/nanimachiOption'
import SelectButton from 'primevue/selectbutton'
import { computed, watch, type Ref } from 'vue'
import VPai from './VPai.vue'
import { answerNanimachi } from '@/composables/nanimachiAnswer'
import { useMagicKeys } from '@vueuse/core'

import type { Manzu, Pinzu, Sozu } from '@/composables/PaiStr.type'

const optionsManzu = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m']
const optionsPinzu = ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p']
const optionsSozu = ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s']

const options = computed(() => {
  if (suit.value === 'm') {
    return optionsManzu
  } else if (suit.value === 'p') {
    return optionsPinzu
  } else if (suit.value === 's') {
    return optionsSozu
  }
  throw new Error('invalid suit')
})

const genPaiStrManzu = (num: number) => `${num}m` as Manzu
const genPaiStrPinzu = (num: number) => `${num}p` as Pinzu
const genPaiStrSozu = (num: number) => `${num}s` as Sozu

const toggleSelect = (num: number, suit: Suit) => {
  const narrowAnswerNanimachiTypeManzu = (v: typeof answerNanimachi): v is Ref<Manzu[]> =>
    v.value.every((i) => i.at(1) === 'm')
  const narrowAnswerNanimachiTypePinzu = (v: typeof answerNanimachi): v is Ref<Pinzu[]> =>
    v.value.every((i) => i.at(1) === 'p')
  const narrowAnswerNanimachiTypeSozu = (v: typeof answerNanimachi): v is Ref<Sozu[]> =>
    v.value.every((i) => i.at(1) === 's')
  switch (true) {
    case suit === 'm' && narrowAnswerNanimachiTypeManzu(answerNanimachi):
      answerNanimachi.value = answerNanimachi.value.includes(genPaiStrManzu(num))
        ? answerNanimachi.value.filter((i) => i !== genPaiStrManzu(num))
        : [...answerNanimachi.value, genPaiStrManzu(num)]
      break
    case suit === 'p' && narrowAnswerNanimachiTypePinzu(answerNanimachi):
      answerNanimachi.value = answerNanimachi.value.includes(genPaiStrPinzu(num))
        ? answerNanimachi.value.filter((i) => i !== genPaiStrPinzu(num))
        : [...answerNanimachi.value, genPaiStrPinzu(num)]
      break
    case suit === 's' && narrowAnswerNanimachiTypeSozu(answerNanimachi):
      answerNanimachi.value = answerNanimachi.value.includes(genPaiStrSozu(num))
        ? answerNanimachi.value.filter((i) => i !== genPaiStrSozu(num))
        : [...answerNanimachi.value, genPaiStrSozu(num)]
      break
    default:
      throw new Error('invalid suit')
  }
}
// prettier-ignore
const {
  digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9,
  numpad1, numpad2, numpad3, numpad4, numpad5, numpad6, numpad7, numpad8, numpad9
} = useMagicKeys()
watch(digit1, (v) => {
  if (v) toggleSelect(1, suit.value)
})
watch(digit2, (v) => {
  if (v) toggleSelect(2, suit.value)
})
watch(digit3, (v) => {
  if (v) toggleSelect(3, suit.value)
})
watch(digit4, (v) => {
  if (v) toggleSelect(4, suit.value)
})
watch(digit5, (v) => {
  if (v) toggleSelect(5, suit.value)
})
watch(digit6, (v) => {
  if (v) toggleSelect(6, suit.value)
})
watch(digit7, (v) => {
  if (v) toggleSelect(7, suit.value)
})
watch(digit8, (v) => {
  if (v) toggleSelect(8, suit.value)
})
watch(digit9, (v) => {
  if (v) toggleSelect(9, suit.value)
})
watch(numpad1, (v) => {
  if (v) toggleSelect(1, suit.value)
})
watch(numpad2, (v) => {
  if (v) toggleSelect(2, suit.value)
})
watch(numpad3, (v) => {
  if (v) toggleSelect(3, suit.value)
})
watch(numpad4, (v) => {
  if (v) toggleSelect(4, suit.value)
})
watch(numpad5, (v) => {
  if (v) toggleSelect(5, suit.value)
})
watch(numpad6, (v) => {
  if (v) toggleSelect(6, suit.value)
})
watch(numpad7, (v) => {
  if (v) toggleSelect(7, suit.value)
})
watch(numpad8, (v) => {
  if (v) toggleSelect(8, suit.value)
})
watch(numpad9, (v) => {
  if (v) toggleSelect(9, suit.value)
})
</script>

<template>
  <SelectButton
    v-model="answerNanimachi"
    :options="options"
    multiple
    class="*:max-w-[calc(100%/9)] *:justify-center *:px-1 *:py-2 *:md:w-[calc(120%/9)] *:md:px-2 *:md:py-3"
  >
    <template #option="{ option }">
      <VPai :pai-str="option" />
    </template>
  </SelectButton>
</template>
