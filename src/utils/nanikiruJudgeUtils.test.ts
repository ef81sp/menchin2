import { describe, it, expect } from 'vitest'
import { seekMinimumShanten } from './nanikiruJudgeUtils'
import { 手牌, 牌 } from 'pairi'

describe('seekMinimumShanten', () => {
  it('should return the minimum shanten number', () => {
    const t = new 手牌('1245589m')
    t.doツモ(new 牌('9m'))
    const analysisResult = t.getAnalysisResult14()!

    const analysisResult14Values = Array.from(analysisResult.values())
    expect(seekMinimumShanten(analysisResult14Values)).toBe(1)
  })
})
