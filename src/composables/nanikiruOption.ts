import { computed, ref } from 'vue'
export type Length = 7 | 10 | 13
export type Suit = 'm' | 'p' | 's'
export type Range = '1-9' | '2-8' | '3-7'
export type Type = 'noten' | 'tempai' | 'tamenmachi' | 'gochamaze'

export const length = ref<Length>(13)
export const suit = ref<Suit>('s')
export const range = ref<Range>('1-9')
export const type = ref<Type>('tempai')

// 以前の設定値を記録するref
export const previous = {
  length: ref<Length>(13),
  suit: ref<Suit>('s'),
  range: ref<Range>('1-9'),
  type: ref<Type>('tempai'),
}

export const isChanged = computed(() => {
  return (
    length.value !== previous.length.value ||
    suit.value !== previous.suit.value ||
    range.value !== previous.range.value ||
    type.value !== previous.type.value
  )
})

export const save = () => {
  // previousに現在の設定値を記録
  previous.length.value = length.value
  previous.suit.value = suit.value
  previous.range.value = range.value
  previous.type.value = type.value
}
