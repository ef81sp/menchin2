import { 牌 } from 'pairi'
import type { PaiStr } from './PaiStr.type'
import { ref } from 'vue'
import { sortAnalysisResult14 } from '../utils/sortAnalysisResult14'
import { isTsumo } from '../utils/isTsumo'
import type { AnalysisResult14 } from '../utils/type'
import { sumRemaining有効牌num } from '@/utils/sumRemaining有効牌num'

export const answer = ref<PaiStr | 'tsumo' | null>(null)

export const clearAnswer = () => {
  answer.value = null
  judgeResult.value = null
}

export const judgeResult = ref<'正解' | '不正解' | null>(null)

export const judge = (analysisResult: AnalysisResult14, tsumo: 牌, answer: PaiStr | 'tsumo') => {
  if (analysisResult === null) {
    throw new Error('analysisResultがnull')
  }

  if (isTsumo(analysisResult, tsumo)) {
    judgeResult.value = answer === 'tsumo' ? '正解' : '不正解'
    return judgeResult.value
  }
  if (answer === 'tsumo') {
    judgeResult.value = '不正解'
    return judgeResult.value
  }

  const _sortedAnalysisResult = sortAnalysisResult14(analysisResult).map(([, value]) => value)
  const minShanten = Math.min(
    ..._sortedAnalysisResult.map(({ analysisResult }) => analysisResult.シャンテン数),
  )
  const onlyMinShantenAnalysisResult = _sortedAnalysisResult.filter(
    ({ analysisResult }) => analysisResult.シャンテン数 === minShanten,
  )

  const maxYuuko = Math.max(
    ...onlyMinShantenAnalysisResult.map(({ analysisResult }) =>
      sumRemaining有効牌num(analysisResult.remaining有効牌num),
    ),
  )

  // 基本は1つだけだが、同一枚数のケースもある
  const correctAnswerPaiStrs = onlyMinShantenAnalysisResult
    .filter(
      (a) =>
        a.analysisResult.シャンテン数 === minShanten &&
        sumRemaining有効牌num(a.analysisResult.remaining有効牌num) === maxYuuko,
    )
    .map((a) => a.打牌.toString())
  judgeResult.value = correctAnswerPaiStrs.includes(answer) ? '正解' : '不正解'
  return judgeResult.value
}
