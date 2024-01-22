import { ref } from 'vue'
export type Length = 7 | 10 | 13
export type Suit = 'm' | 'p' | 's'
export type Range = '1-9' | '2-8' | '3-7'
export type Type = 'noten' | 'tempai' | 'tamenmachi' | 'gochamaze'

export const length = ref<Length>(13)
export const suit = ref<Suit>('s')
export const range = ref<Range>('1-9')
export const type = ref<Type>('tempai')
