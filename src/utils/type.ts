import { 牌, type 手牌 } from 'pairi'

export type AnalysisResult13 = ReturnType<手牌['getAnalysisResult13']> & {}
export type AnalysisResult手牌13 =
  AnalysisResult13['analysisResult']['_5ブロック']['indivisuals'][number]
export type ExtractResult5ブロック = AnalysisResult手牌13['ブロック']
export type AnalysisResult14 = ReturnType<手牌['getAnalysisResult14']> & {}
export type AnalysisResult14Value = AnalysisResult14 extends Map<unknown, infer V> ? V : never

export type StrPai = ReturnType<牌['toString']>

export type PaiList = PaiList7 | PaiList10 | PaiList13
export type PaiList7 = [牌, 牌, 牌, 牌, 牌, 牌, 牌]
export type PaiList10 = [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]
export type PaiList13 = [牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌, 牌]