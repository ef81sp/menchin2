import { describe, expect, it } from 'vitest'
import { isTsumo } from './isTsumo'
import { 手牌, 牌 } from 'pairi'

describe('isTsumo', () => {
  it('ツモっているとき true を返すこと', () => {
    const t = new 手牌('1115599m')
    t.doツモ(new 牌('9m'))
    const analysisResult = t.getAnalysisResult14()!

    const result = isTsumo(analysisResult, new 牌('9m'))
    expect(result).toBe(true)
  })
  it('ツモっていないとき false を返すこと', () => {
    const t = new 手牌('1115599m')
    t.doツモ(new 牌('9m'))
    const analysisResult = t.getAnalysisResult14()!

    const result = isTsumo(analysisResult, new 牌('8m'))
    expect(result).toBe(false)
  })
})
