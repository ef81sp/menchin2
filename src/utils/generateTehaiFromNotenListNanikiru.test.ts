import { describe, expect, it } from 'vitest'
import { generateTehaiFromNotenListNanikiru } from './generateTehaiFromNotenListNanikiru'

describe('generateTehaiFromNotenListNanimachi', () => {
  describe('枚数のテスト', () => {
    describe('範囲が2-8の場合', () => {
      it('7枚の手牌を生成できること', () => {
        const tehai = generateTehaiFromNotenListNanikiru('m', '2-8', 7)
        expect(tehai.牌List()).toHaveLength(8)
      })
      it('10枚の手牌を生成できること', () => {
        const tehai = generateTehaiFromNotenListNanikiru('m', '2-8', 10)
        expect(tehai.牌List()).toHaveLength(11)
      })
      it('13枚の手牌を生成できること', () => {
        const tehai = generateTehaiFromNotenListNanikiru('m', '2-8', 13)
        expect(tehai.牌List()).toHaveLength(14)
      })
    })
    describe('範囲が3-7の場合', () => {
      it('7枚の手牌を生成できること', () => {
        const tehai = generateTehaiFromNotenListNanikiru('m', '3-7', 7)
        expect(tehai.牌List()).toHaveLength(8)
      })
      it('10枚の手牌はエラーになること', () => {
        expect(() => generateTehaiFromNotenListNanikiru('m', '3-7', 10)).toThrowError()
      })
      it('13枚の手牌はエラーになること', () => {
        expect(() => generateTehaiFromNotenListNanikiru('m', '3-7', 13)).toThrowError()
      })
    })
  })
  describe('範囲のテスト', () => {
    it('2-8の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanikiru('m', '2-8', 13)
      expect(tehai.牌List().every((v) => v.number >= 2 && v.number <= 8)).toBeTruthy()
    })
    it('3-7の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanikiru('m', '3-7', 7)
      expect(tehai.牌List().every((v) => v.number >= 3 && v.number <= 7)).toBeTruthy()
    })
  })
  describe('スートのテスト', () => {
    it('萬子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanikiru('m', '3-7', 7)
      expect(tehai.牌List().every((v) => v.suit === 'm')).toBeTruthy()
    })
    it('筒子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanikiru('p', '3-7', 7)
      expect(tehai.牌List().every((v) => v.suit === 'p')).toBeTruthy()
    })
    it('索子の手牌を生成できること', () => {
      const tehai = generateTehaiFromNotenListNanikiru('s', '3-7', 7)
      expect(tehai.牌List().every((v) => v.suit === 's')).toBeTruthy()
    })
  })
})
