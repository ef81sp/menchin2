import { 手牌, 牌 } from 'pairi'
import { shuffle } from './generateHandUtils'
import type { GenerateHandArg, PaiList, PaiList10, PaiList13, PaiList7, StrPai } from '@/utils/type'
import { noten3To7_13, noten3To7_10, noten3To7_7 } from '@/utils/const'

export function generateTehaiFromNotenListNanimachi(
  suit: NonNullable<GenerateHandArg['suit']>,
  range: '3-7',
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 {
  const notenList = getNotenList(range, length)
  // notenListからランダムに1つ選ぶ
  const noten = notenList[Math.floor(Math.random() * notenList.length)]
  const  paiList = genPaiList(noten, suit)
  const tehai = new 手牌(paiList)
  return tehai
}

function getNotenList(
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
) {
  if (range !== '3-7') {
    throw new Error('rangeは3-7にしてください')
  }
  switch (length) {
    case 7:
      return noten3To7_7
    case 10:
      return noten3To7_10
    case 13:
      return noten3To7_13
    default:
      throw new Error('lengthがおかしい')
  }
}

function genPaiList(noten: string, suit: NonNullable<GenerateHandArg['suit']>): PaiList {
  if (!/\d+/.test(noten)) {
    throw new Error('notenがおかしい')
  }
  // noten.length が 8, 11, 14のいずれかでない場合はエラー
  if (![7, 10, 13].includes(noten.length)) {
    throw new Error('notenがおかしい')
  }

  const strPaiList = shuffle([...noten].map((v) => v + suit) as StrPai[])

  if (strPaiList.length === 7) {
    return strPaiList.slice(0, 7).map((v) => new 牌(v)) as PaiList7
  }
  if (strPaiList.length === 11) {
    return strPaiList.slice(0, 10).map((v) => new 牌(v)) as PaiList10
  }
  return strPaiList.slice(0, 13).map((v) => new 牌(v)) as PaiList13
}
