import { 手牌, 牌 } from 'pairi'
import { ref } from 'vue'
import * as option from './nanimachiOption'
import { generateRandomMountain } from '../utils/generateHandUtils'

export const handNanimachi = ref<手牌>(
  new 手牌([
    new 牌('1s'),
    new 牌('1s'),
    new 牌('1s'),
    new 牌('2s'),
    new 牌('3s'),
    new 牌('4s'),
    new 牌('5s'),
    new 牌('6s'),
    new 牌('7s'),
    new 牌('8s'),
    new 牌('9s'),
    new 牌('9s'),
    new 牌('9s'),
  ]),
)
export const generateHandNanimachi = (
  length: 7 | 10 | 13 = option.length.value,
  suit: 'm' | 'p' | 's' = option.suit.value,
  range: '1-9' | '2-8' | '3-7' = option.range.value,
  waitNum: number = option.waitNum.value,
) => {
  do {
    const mountain = generateRandomMountain(suit, range)
    const handStr = mountain.slice(0, length)
    const handPaiList = handStr.map((v) => new 牌(v)) as typeof length extends 7
      ? [牌, 牌, 牌, 牌, 牌, 牌, 牌]
      : typeof length extends 10
        ? [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
        : [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]

    const tehai = new 手牌(handPaiList)
    if (waitNum === 0) {
      // ノーテン以上なのでなんでも返して良い
      handNanimachi.value = tehai
      return handNanimachi.value
    }

    const analysisResult = tehai.getAnalysisResult13()
    if (analysisResult === null) {
      throw new Error('手牌がおかしい')
    }
    if (analysisResult.シャンテン数 === 0) {
      if (analysisResult.有効牌.length >= waitNum) {
        handNanimachi.value = tehai
        return handNanimachi.value
      }
    }

    // eslint-disable-next-line no-constant-condition
  } while (true)
}
