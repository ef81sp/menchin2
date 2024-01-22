import type { AnalysisResult14Value } from './type'

export const seekMinimumShanten = (analysisResult14Values: AnalysisResult14Value[]) =>
  Math.min(...analysisResult14Values.map(({ analysisResult }) => analysisResult.シャンテン数))
