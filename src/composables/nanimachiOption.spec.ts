import {
  length,
  suit,
  range,
  type,
  exclude5,
  needBlockNum,
  previous,
  isChanged,
  save,
} from './nanimachiOption'
import { describe, it, expect, beforeEach } from 'vitest'

describe('nanimachiOptionのコンポーザブル', () => {
  beforeEach(() => {
    length.value = 13
    suit.value = 's'
    range.value = '1-9'
    type.value = 'tempai'
    exclude5.value = true
    save()
  })

  it('needBlockNumを正しく計算するべき', () => {
    length.value = 7
    expect(needBlockNum.value).toBe(3)
    length.value = 10
    expect(needBlockNum.value).toBe(4)
    length.value = 13
    expect(needBlockNum.value).toBe(5)
  })

  it('変更を正しく検出するべき', () => {
    expect(isChanged.value).toBe(false)
    length.value = 10
    expect(isChanged.value).toBe(true)
    save()
    expect(isChanged.value).toBe(false)
  })

  it('現在の設定を正しく保存するべき', () => {
    length.value = 10
    suit.value = 'm'
    range.value = '2-8'
    type.value = 'noten'
    exclude5.value = false
    save()
    expect(previous.length.value).toBe(10)
    expect(previous.suit.value).toBe('m')
    expect(previous.range.value).toBe('2-8')
    expect(previous.type.value).toBe('noten')
    expect(previous.exclude5.value).toBe(false)
  })
})
