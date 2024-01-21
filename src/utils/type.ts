import { type 手牌 } from 'pairi'

export type AnalysisResult13 = ReturnType<手牌['getAnalysisResult13']> & {}
export type AnalysisResult14 = ReturnType<手牌['getAnalysisResult14']> & {}
export type AnalysisResult14Value = AnalysisResult14 extends Map<unknown, infer V> ? V : never