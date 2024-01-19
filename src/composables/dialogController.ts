import { ref } from 'vue'

export const visibleNanimachiOption = ref(false)
export const showNanimachiOption = () => {
  visibleNanimachiOption.value = true
}

export const visibleNanimachiExplanation = ref(false)
export const showNanimachiExplanation = () => {
  visibleNanimachiExplanation.value = true
}

export const visibleNanikiruOption = ref(false)
export const showNanikiruOption = () => {
  visibleNanikiruOption.value = true
}

export const visibleNanikiruExplanation = ref(false)
export const showNanikiruExplanation = () => {
  visibleNanikiruExplanation.value = true
}
