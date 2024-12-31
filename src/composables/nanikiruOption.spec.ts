import { length, suit, range, type, isChanged, save } from './nanikiruOption'
import { describe, it, expect, beforeEach } from 'vitest'

describe('nanikiruOptionのコンポーザブル', () => {
  beforeEach(() => {
    // テスト前に初期状態にリセット
    length.value = 13
    suit.value = 's'
    range.value = '1-9'
    type.value = 'tempai'
    save()
  })

  it('lengthの変更を検出するべき', () => {
    length.value = 7
    expect(isChanged.value).toBe(true)
  })

  it('suitの変更を検出するべき', () => {
    suit.value = 'm'
    expect(isChanged.value).toBe(true)
  })

  it('rangeの変更を検出するべき', () => {
    range.value = '2-8'
    expect(isChanged.value).toBe(true)
  })

  it('typeの変更を検出するべき', () => {
    type.value = 'noten'
    expect(isChanged.value).toBe(true)
  })

  it('保存後に変更を検出しないべき', () => {
    length.value = 7
    save()
    expect(isChanged.value).toBe(false)
  })
})
