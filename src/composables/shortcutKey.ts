import { useMagicKeys } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const shortcutType = ref<'normal' | 'tenkey'>('normal')
export const reloadKeyStr = computed(() => {
  switch (shortcutType.value) {
    case 'normal':
      return 'r'
    case 'tenkey':
      return '+'
    default:
      return null as never
  }
})
export const judgeKeyStr = computed(() => {
  switch (shortcutType.value) {
    case 'normal':
      return 'j'
    case 'tenkey':
      return '↵'
    default:
      return null as never
  }
})
export const explainKeyStr = computed(() => {
  switch (shortcutType.value) {
    case 'normal':
      return 'e'
    case 'tenkey':
      return '-'
    default:
      return null as never
  }
})
export const tsumoKeyStr = computed(() => {
  switch (shortcutType.value) {
    case 'normal':
      return 't'
    case 'tenkey':
      return '↵'
    default:
      return null as never
  }
})

// prettier-ignore
const {
  digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9,
  t, r, j, e,
  numpad1, numpad2, numpad3, numpad4, numpad5, numpad6, numpad7, numpad8, numpad9,
  numpadEnter, numpadAdd, numpadSubtract
} = useMagicKeys()

// prettier-ignore
watch([digit1, digit2, digit3, digit4, digit5, digit6, digit7, digit8, digit9, t, r, j, e], (keys) => {
  if (keys.includes(true)) shortcutType.value = 'normal'
})
// prettier-ignore
watch([numpad1, numpad2, numpad3, numpad4, numpad5, numpad6, numpad7, numpad8, numpad9, numpadEnter, numpadAdd, numpadSubtract], (keys) => {
  if (keys.includes(true)) shortcutType.value = 'tenkey'
})
