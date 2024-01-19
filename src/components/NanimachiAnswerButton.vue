<script setup lang="ts">
import { suit } from '@/composables/nanimachiOption'
import SelectButton from 'primevue/selectbutton'
import { computed } from 'vue'
import VPai from './VPai.vue'
import { answerNanimachi } from '@/composables/nanimachiAnswer'

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
</script>

<template>
  <SelectButton
    v-model="answerNanimachi"
    :options="options"
    multiple
    class="*:max-w-[calc(100%/9)] *:px-1 *:py-2 *:md:w-[calc(120%/9)] *:md:px-2 *:md:py-3"
  >
    <template #option="{ option }">
      <VPai :pai-str="option" />
    </template>
  </SelectButton>
</template>
@/composables/option@/composables/nanimachiOption@/composables/nanimachiAnswer
