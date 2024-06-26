import { 牌, type 手牌 } from 'pairi'
import * as option from '../composables/nanikiruOption'
import type { PaiStr } from '@/composables/PaiStr.type'

export type AnalysisResult13 = ReturnType<手牌['getAnalysisResult13']> & {}
export type AnalysisResult手牌13_5 =
  AnalysisResult13['analysisResult']['_5ブロック']['indivisuals'][number]
export type AnalysisResult手牌13_7pairs = AnalysisResult13['analysisResult']['七対子']
export type ExtractResult5ブロック = AnalysisResult手牌13_5['ブロック']
export type AnalysisResult14 = ReturnType<手牌['getAnalysisResult14']> & {}
export type AnalysisResult14Value = AnalysisResult14 extends Map<unknown, infer V> ? V : never

export type StrPai = ReturnType<牌['toString']>

export type PaiList = PaiList7 | PaiList10 | PaiList13
export type PaiList7 = [牌, 牌, 牌, 牌, 牌, 牌, 牌]
export type PaiList10 = [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
export type PaiList13 = [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]

export type GenerateHandArg = {
  length?: option.Length
  suit?: option.Suit
  range?: option.Range
  type?: option.Type
}

export type NanimachiExplanation = {
  block: PaiStr[][]
  yuuko: PaiStr[]
}
