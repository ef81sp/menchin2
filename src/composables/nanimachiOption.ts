import { ref } from 'vue'

export const length = ref<7 | 10 | 13>(13)
export const suit = ref<'m' | 'p' | 's'>('s')
export const range = ref<'1-9' | '2-8' | '3-7'>('1-9')
export const waitNum = ref<number>(1)
