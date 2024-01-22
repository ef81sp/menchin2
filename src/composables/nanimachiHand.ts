import { 手牌, 牌 } from 'pairi'
import { ref } from 'vue'
import * as option from './nanimachiOption'
import { generateRandomMountain } from '../utils/generateHandUtils'
import type { AnalysisResult13 } from '@/utils/type'

export const hand = ref<手牌>(
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

type GenerateHandArg = {
  length?: option.Length
  suit?: option.Suit
  range?: option.Range
  type?: option.Type
}
export const generateHand = ({
  length = option.length.value,
  suit = option.suit.value,
  range = option.range.value,
  type = option.type.value,
}: GenerateHandArg = {}) => {
  const tehai = generateTehai(suit, range, length, generateType(type))

  hand.value = tehai
  return tehai
}

const generateType = (type: option.Type): Omit<option.Type, 'gochamaze'> => {
  switch (type) {
    case 'noten':
    case 'tempai':
    case 'tamenmachi':
      return type
    case 'gochamaze': {
      // 均等に分配する
      const random = Math.random()
      if (random < 1 / 3) {
        return 'noten'
      } else if (random < 2 / 3) {
        return 'tempai'
      } else {
        return 'tamenmachi'
      }
    }
  }
}

function generateTehai(
  suit: option.Suit,
  range: option.Range,
  length: option.Length,
  type: Omit<option.Type, 'gochamaze'>,
): 手牌 {
  if (type === 'noten') {
    return generateTehaiForNoten(suit, range, length)
  }
  if (type === 'tempai') {
    // const tehai = tehaiPoolTempai.value.pop() as 手牌 | undefined
    // return tehai ?? generateTehaiForTempai(suit, range, length)
    return generateTehaiForTempai(suit, range, length)
  }
  if (type === 'tamenmachi') {
    // const tehai = tehaiPoolTamenmachi.value.pop() as 手牌 | undefined
    // return tehai ?? generateTehaiForTamenmachi(suit, range, length)
    return generateTehaiForTamenmachi(suit, range, length)
  }
  throw new Error('typeがおかしい')
}

const generateTehaiForNoten = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // シャンテン数が1以上の手牌ができるまでgenerateHand13を繰り返す
  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  do {
    ;[tehai, analysisResult13] = generateHand13(suit, range, length)
  } while (analysisResult13.シャンテン数 === 0)

  return tehai
}

const generateTehaiForTempai = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // シャンテン数が0の手牌ができるまでgenerateHand13を繰り返す
  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  do {
    ;[tehai, analysisResult13] = generateHand13(suit, range, length)
  } while (analysisResult13.シャンテン数 !== 0)

  return tehai
}

const generateTehaiForTamenmachi = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // シャンテン数が0かつ有効牌が3種以上の手牌ができるまでgenerateHand13を繰り返す
  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  do {
    ;[tehai, analysisResult13] = generateHand13(suit, range, length)

    if (analysisResult13.シャンテン数 === 0 && analysisResult13.有効牌.length >= 3) {
      break
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)

  return tehai
}

const generateHand13 = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): [手牌, AnalysisResult13] => {
  const mountain = generateRandomMountain(suit, range)
  const handStr = mountain.slice(0, length)
  const handPaiList = handStr.map((v) => new 牌(v)) as typeof length extends 7
    ? [牌, 牌, 牌, 牌, 牌, 牌, 牌]
    : typeof length extends 10
      ? [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
      : [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]

  const tehai = new 手牌(handPaiList)
  const analysisResult = tehai.getAnalysisResult13()
  if (analysisResult === null) {
    throw new Error('手牌がおかしい')
  }
  return [tehai, analysisResult]
}
