import { 手牌, 牌 } from 'pairi'
import { ref } from 'vue'
import * as option from './nanikiruOption'
import { generateRandomMountain } from '../utils/generateHandUtils'
import type { AnalysisResult13, StrPai } from '@/utils/type'

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
  do {
    const tehai = generateTehai(suit, range, length, generateType(type))

    const _analysisResult = tehai.getAnalysisResult14()
    if (_analysisResult === null) {
      throw new Error('手牌がおかしい')
    }
    hand.value = tehai
    return tehai

    // eslint-disable-next-line no-constant-condition
  } while (true)
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
    // const tehai = tehaiPoolNoten.value.pop() as 手牌 | undefined

    // return tehai ?? generateTehaiForNoten(suit, range, length)
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

// =============

const tehaiPoolNoten = ref<手牌[]>([])
const tehaiPoolTempai = ref<手牌[]>([])
const tehaiPoolTamenmachi = ref<手牌[]>([])

const poolTehai13 = (tehai: 手牌) => {
  const analysisResult13 = tehai.getAnalysisResult13()
  if (analysisResult13 === null) {
    throw new Error('手牌がおかしい')
  }
  if (analysisResult13.シャンテン数 !== 0) {
    tehaiPoolNoten.value.push(tehai)
    return
  }
  if (analysisResult13.有効牌.length >= 3) {
    tehaiPoolTamenmachi.value.push(tehai)
    return
  }
  tehaiPoolTempai.value.push(tehai)
}

const generateTehaiForNoten = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // シャンテン数が1以上かつ、ノーテンを維持できる牌がrestMountainにある状態になるまでgenerateHand13を繰り返す
  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  let restMountain: StrPai[]
  let notenPai: StrPai | undefined
  do {
    ;[tehai, analysisResult13, restMountain] = generateHand13(suit, range, length)
    if (analysisResult13.シャンテン数 === 0) {
      poolTehai13(tehai)
      continue
    }
    const notenPaiList = analysisResult13.有効牌.map((v) => v.toString())
    notenPai = restMountain.find((v) => !notenPaiList.includes(v))
    if (notenPai === undefined) continue
    break
    // eslint-disable-next-line no-constant-condition
  } while (true)

  tehai.doツモ(new 牌(notenPai))

  return tehai
}
const generateTehaiForTempai = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // シャンテン数が0かつ有効牌の数が1以上のものが出るまでgenerateHand13を繰り返す
  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  let restMountain: StrPai[]
  let tempaiPai: StrPai | undefined
  console.log('here')
  do {
    ;[tehai, analysisResult13, restMountain] = generateHand13(suit, range, length)
    if (analysisResult13.シャンテン数 >= 2) continue
    // テンパイしていれば何を引いてもテンパイ
    if (analysisResult13.シャンテン数 === 0) break

    // イーシャンテンなら、有効牌を引けばテンパイ
    const tempaiPaiList = analysisResult13.有効牌.map((v) => v.toString())
    tempaiPai = restMountain.find((v) => tempaiPaiList.includes(v))
    break
    // eslint-disable-next-line no-constant-condition
  } while (true)

  if (tempaiPai === undefined) {
    // 既にテンパイしているのでなんでもよい
    tempaiPai = restMountain[0]
  }
  tehai.doツモ(new 牌(tempaiPai))

  return tehai
}
const generateTehaiForTamenmachi = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 => {
  // こいつだけ特殊。analysisResult14のうち、シャンテン数が0で有効牌の数が3以上のものを作って返す。

  let tehai: 手牌
  let analysisResult13: AnalysisResult13
  let restMountain: StrPai[]
  let tempaiPai: StrPai | undefined
  do {
    ;[tehai, analysisResult13, restMountain] = generateHand13(suit, range, length)
    // リャンシャンテンはダメ
    if (analysisResult13.シャンテン数 >= 2) {
      poolTehai13(tehai)
      continue
    }
    // テンパイしていても、有効牌が3枚以上ならそのまま使える
    if (analysisResult13.シャンテン数 === 0 && analysisResult13.有効牌.length >= 3) break

    // // 有効牌2枚以下のテンパイなら、適当に1枚引いてみる
    // if (analysisResult13.シャンテン数 === 0) {
    //   tehai.doツモ(new 牌(restMountain[0]))
    // } else if (analysisResult13.シャンテン数 === 1) {
    //   // イーシャンテンなら、有効牌を引けばテンパイ
    //   const tempaiPaiList = analysisResult13.有効牌.map((v) => v.toString())
    //   tempaiPai = restMountain.find((v) => tempaiPaiList.includes(v))
    //   if (tempaiPai === undefined) {
    //     // あるはずだけど型ガードだからね、仕方ないね
    //     continue
    //   }
    //   tehai.doツモ(new 牌(tempaiPai))
    // }

    // break
    // eslint-disable-next-line no-constant-condition
  } while (true)

  if (tempaiPai === undefined) {
    // 既にテンパイしているのでなんでもよい
    tempaiPai = restMountain[0]
  }

  // tempaiPaiとtehaiを混ぜて新しく作り直す
  const insertIndex = Math.floor(Math.random() * (length + 1))
  const newList = tehai.牌ListExcludesツモ().map((v) => v.toString())
  newList.splice(insertIndex, 0, tempaiPai)
  const newList13 = newList.slice(0, length).map((v) => new 牌(v)) as typeof length extends 7
    ? [牌, 牌, 牌, 牌, 牌, 牌, 牌]
    : typeof length extends 10
      ? [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
      : [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]

  tehai = new 手牌(newList13)
  tehai.doツモ(new 牌(newList[length]))

  return tehai
}

const generateHand13 = (
  suit: NonNullable<GenerateHandArg['suit']>,
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
): [手牌, AnalysisResult13, StrPai[]] => {
  const mountain = generateRandomMountain(suit, range)
  const handStr = mountain.slice(0, length)
  const uniqueRestMountain = Array.from(new Set(mountain.slice(length)))
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
  return [tehai, analysisResult, uniqueRestMountain]
}
