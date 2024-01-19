import type { AnalysisResult13 } from '@/utils/type'

type Remaining有効牌num = NonNullable<AnalysisResult13>['remaining有効牌num']
export const sumRemaining有効牌num = (remaining有効牌num: Remaining有効牌num): number => {
  return Array.from(remaining有効牌num.values()).reduce((prev, b) => prev + b.remains, 0)
}
