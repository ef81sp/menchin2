import { 手牌, 牌 } from 'pairi'
import { computed, ref } from 'vue'
import * as option from './nanikiruOption'
import { generateRandomMountain } from '../utils/generateHandUtils'
import { seekMinimumShanten } from '@/utils/nanikiruJudgeUtils'

const initialHand = new 手牌([
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
])
initialHand.doツモ(new 牌('1s'))

export const hand = ref<手牌>(initialHand)

type GenerateHandArg = {
  length?: 7 | 10 | 13
  suit?: 'm' | 'p' | 's'
  range?: '1-9' | '2-8' | '3-7'
  waitNum?: number
  randomlyNotenOrTempai?: 'noten' | 'tempai' | null
}
export const generateHand = ({
  length = option.length.value,
  suit = option.suit.value,
  range = option.range.value,
  waitNum = option.waitNum.value,
  randomlyNotenOrTempai = null,
}: GenerateHandArg = {}) => {

  let i = 0
  do {
    i++
    // if (i > 20) {
    //   throw new Error('無限ループ')
    // }
    const mountain = generateRandomMountain(suit, range)
    const handStr = mountain.slice(0, length)
    const handPaiList = handStr.map((v) => new 牌(v)) as typeof length extends 7
      ? [牌, 牌, 牌, 牌, 牌, 牌, 牌]
      : typeof length extends 10
        ? [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
        : [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]

    const tehai = new 手牌(handPaiList)
    tehai.doツモ(new 牌(mountain[Number(length)]))

    const _analysisResult = tehai.getAnalysisResult14()
    if (_analysisResult === null) {
      throw new Error('手牌がおかしい')
    }
    const analysisResult = Array.from(_analysisResult.values())

    const minimumShanten = seekMinimumShanten(analysisResult)

    if (waitNum === 0) {
      // _randomlyNotenOrTempai === 'noten' のときは、シャンテン数が1以上の手牌を返すためやり直し
      if (randomlyNotenOrTempai === 'noten' && minimumShanten === 0) {
        continue
      }
      // _randomlyNotenOrTempai === 'tempai' のときは、シャンテン数が0の手牌を返すためやり直し
      if (randomlyNotenOrTempai === 'tempai' && minimumShanten !== 0) {
        continue
      }
      hand.value = tehai
      console.log('looped:', i)
      return hand.value
    }

    if (minimumShanten === 0) {
      const onlyMinimumShanten = analysisResult.filter(
        ({ analysisResult }) => analysisResult.シャンテン数 === minimumShanten,
      )
      if (
        Math.max(...onlyMinimumShanten.map(({ analysisResult }) => analysisResult.有効牌.length)) >=
        waitNum
      ) {
        hand.value = tehai
        console.log('looped:', i)
        return hand.value
      }
    }

    // eslint-disable-next-line no-constant-condition
  } while (true)
}
