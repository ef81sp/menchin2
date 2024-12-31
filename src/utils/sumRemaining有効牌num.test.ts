import { describe, it, expect } from 'vitest'
import { sumRemaining有効牌num } from './sumRemaining有効牌num'
import { 牌 } from 'pairi'

describe('sumRemaining有効牌num', () => {
  it('有効牌の合計が返ること', () => {
    const remaining有効牌num = new Map([
      ['1m', { 牌: new 牌('1m'), remains: 1 }],
      ['2m', { 牌: new 牌('2m'), remains: 2 }],
      ['3m', { 牌: new 牌('3m'), remains: 3 }],
    ] as const)
    expect(sumRemaining有効牌num(remaining有効牌num)).toBe(6)
  })
  it('有効牌がない場合0が返ること', () => {
    const remaining有効牌num = new Map()
    expect(sumRemaining有効牌num(remaining有効牌num)).toBe(0)
  })
})
