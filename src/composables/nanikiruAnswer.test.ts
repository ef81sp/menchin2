import { 手牌, 牌 } from 'pairi'
import { describe, it, expect, beforeEach } from 'vitest'
import { answer, clearAnswer, judge, judgeResult } from './nanikiruAnswer'

describe('nankiruAnswerのコンポーザブル', () => {
  describe('judge', () => {
    it('正解の場合正解を返す: ツモ', () => {
      const t = new 手牌('1112345m')
      t.doツモ(new 牌('6m'))

      judge(t.getAnalysisResult14()!, new 牌('6m'), 'tsumo')
      expect(judgeResult.value).toBe('正解')
    })
    it('正解の場合正解を返す: 打牌', () => {
      const t = new 手牌('1133579m')
      t.doツモ(new 牌('6m'))

      judge(t.getAnalysisResult14()!, new 牌('6m'), '9m')
      expect(judgeResult.value).toBe('正解')
    })
    it('正解の場合正解を返す: 有効牌', () => {
      const t = new 手牌('1235558m')
      t.doツモ(new 牌('6m'))

      judge(t.getAnalysisResult14()!, new 牌('6m'), '8m')
      expect(judgeResult.value).toBe('正解')
    })
    it('不正解の場合不正解を返す', () => {
      const t = new 手牌('1112345m')
      t.doツモ(new 牌('6m'))

      judge(t.getAnalysisResult14()!, new 牌('6m'), '1m')
      expect(judgeResult.value).toBe('不正解')
    })
  })
  describe('clearAnswer', () => {
    it('answerとjudgeResultをnullにする', () => {
      judgeResult.value = '正解'
      answer.value = '1m'

      clearAnswer()
      expect(judgeResult.value).toBeNull()
      expect(answer.value).toBeNull()
    })
  })
})
