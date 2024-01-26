import { 手牌, 牌 } from 'pairi'
import { shuffle } from './generateHandUtils'
import type { GenerateHandArg, PaiList, PaiList10, PaiList13, PaiList7, StrPai } from '@/utils/type'
import { noten2To8_8, noten2To8_11, noten2To8_14, noten3To7_8 } from '@/utils/const'

export function generateTehaiFromNotenListNanikiru(
  suit: NonNullable<GenerateHandArg['suit']>,
  range: '2-8' | '3-7',
  length: NonNullable<GenerateHandArg['length']>,
): 手牌 {
  const notenList = getNotenList(range, length)
  // notenListからランダムに1つ選ぶ
  const noten = notenList[Math.floor(Math.random() * notenList.length)]
  const { paiList, tsumo } = genPaiList(noten, suit)
  const tehai = new 手牌(paiList)
  tehai.doツモ(tsumo)
  return tehai
}

function getNotenList(
  range: NonNullable<GenerateHandArg['range']>,
  length: NonNullable<GenerateHandArg['length']>,
) {
  if (range === '3-7' && length > 7) {
    throw new Error('3-7の場合、lengthは7以下にしてください')
  }
  switch (length) {
    case 7: {
      if (range === '2-8') {
        return noten2To8_8
      } else {
        return noten3To7_8
      }
    }
    case 10:
      return noten2To8_11
    case 13:
      return noten2To8_14
  }
}

function genPaiList(
  noten: string,
  suit: NonNullable<GenerateHandArg['suit']>,
): {
  paiList: PaiList
  tsumo: 牌
} {
  if (!/\d+/.test(noten)) {
    throw new Error('notenがおかしい')
  }
  // noten.length が 8, 11, 14のいずれかでない場合はエラー
  if (![8, 11, 14].includes(noten.length)) {
    throw new Error('notenがおかしい')
  }

  const strPaiList = shuffle([...noten].map((v) => v + suit) as StrPai[])

  if (strPaiList.length === 8) {
    return {
      paiList: strPaiList.slice(0, 7).map((v) => new 牌(v)) as PaiList7,
      tsumo: new 牌(strPaiList[7]),
    }
  }
  if (strPaiList.length === 11) {
    return {
      paiList: strPaiList.slice(0, 10).map((v) => new 牌(v)) as PaiList10,
      tsumo: new 牌(strPaiList[10]),
    }
  }
  return {
    paiList: strPaiList.slice(0, 13).map((v) => new 牌(v)) as PaiList13,
    tsumo: new 牌(strPaiList[13]),
  }
}
