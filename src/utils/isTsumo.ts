import { 牌 } from 'pairi'
import type { AnalysisResult14 } from '@/utils/type'

export const isTsumo = (analysisResult: AnalysisResult14, tsumo: 牌) => {
  const result13 = analysisResult.get(tsumo.toString())
  return (
    result13 !== undefined &&
    result13.analysisResult.シャンテン数 === 0 &&
    result13.analysisResult.有効牌.some((p) => p.toEqual(tsumo))
  )
}
