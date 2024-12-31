import { describe, it, expect } from 'vitest'
import { sortAnalysisResult14 } from './sortAnalysisResult14'
import { type AnalysisResult14 } from '@/utils/type'
import { 手牌, 牌 } from 'pairi'
import { sumRemaining有効牌num } from './sumRemaining有効牌num'

describe('sortAnalysisResult14', () => {
  it('should sort by シャンテン数 first and then by remaining有効牌num', () => {
    const t = new 手牌('1245589m')
    t.doツモ(new 牌('9m'))
    const analysisResult: NonNullable<AnalysisResult14> = t.getAnalysisResult14()!

    const sortedResult = sortAnalysisResult14(analysisResult)

    expect(
      sortedResult.map((r) => [
        r[0],
        r[1].analysisResult.シャンテン数,
        sumRemaining有効牌num(r[1].analysisResult.remaining有効牌num),
      ]),
    ).toEqual([
      ['1m', 1, 12],
      ['4m', 1, 12],
      ['8m', 1, 12],
      ['5m', 1, 8],
      ['9m', 1, 8],
      ['2m', 2, 28],
    ])
  })
})
