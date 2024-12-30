import { describe, expect, it } from 'vitest'
import { generateTehaiFromNotenListNanimachi } from './generateTehaiFromNotenListNanimachi'

describe('generateTehaiFromNotenListNanimachi', () => {
  describe('枚数のテスト', () => {
    it('7枚の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('m', '3-7', 7)
      expect(tehai.牌List()).toHaveLength(7)
    })
    it('10枚の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('m', '3-7', 10)
      expect(tehai.牌List()).toHaveLength(10)
    })
    it('13枚の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('m', '3-7', 13)
      expect(tehai.牌List()).toHaveLength(13)
    })
  })
  describe('スートのテスト', () => {
    it('萬子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('m', '3-7', 7)
      expect(tehai.牌List().every((pai) => pai.suit === 'm')).toBe(true)
    })
    it('筒子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('p', '3-7', 7)
      expect(tehai.牌List().every((pai) => pai.suit === 'p')).toBe(true)
    })
    it('索子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanimachi('s', '3-7', 7)
      expect(tehai.牌List().every((pai) => pai.suit === 's')).toBe(true)
    })
  })
})
