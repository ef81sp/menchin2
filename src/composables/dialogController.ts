import { ref } from 'vue'

export const visibleNanimachiOption = ref(false)
export const showNanimachiOption = () => {
  visibleNanimachiOption.value = true
}

export const visibleNanimachiExplanation = ref(false)
export const showNanimachiExplanation = () => {
  visibleNanimachiExplanation.value = true
}
