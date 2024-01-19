import { type AnalysisResult14 } from '@/utils/type'
import { sumRemaining有効牌num } from '@/utils/sumRemaining有効牌num'

export const sortAnalysisResult14 = (analysisResult: NonNullable<AnalysisResult14>) =>
  Array.from(analysisResult).sort(([, a], [, b]) => {
    if (a.analysisResult.シャンテン数 === b.analysisResult.シャンテン数) {
      return (
        sumRemaining有効牌num(b.analysisResult.remaining有効牌num) -
        sumRemaining有効牌num(a.analysisResult.remaining有効牌num)
      )
    } else {
      return a.analysisResult.シャンテン数 - b.analysisResult.シャンテン数
    }
  })
