import { sortAnalysisResult14 } from '@/utils/sortAnalysisResult14'
import { generateHand } from './nanikiruHand'

describe('generateHand', () => {
  describe('waitNum', () => {
    describe.skip('waitNum === 0', () => {
      describe('randomlyNotenOrTempai === "noten', () => {
        const hand = generateHand({
          length: 13,
          suit: 's',
          range: '1-9',
          waitNum: 0,
          randomlyNotenOrTempai: 'noten',
        })
        test('手牌が14枚', () => {
          expect(hand.牌List().length).toBe(14)
        })
        test('シャンテン数が1以上', () => {
          const analysisResult = hand.getAnalysisResult14()
          if (analysisResult === null) {
            throw new Error('analysisResultがnull')
          }
          const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

          const minimumShanten = Math.min(
            ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
          )
          expect(minimumShanten).toBeGreaterThan(0)
        })
      })
    })
    describe('waitNum === 1', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '1-9',
        waitNum: 1,
      })
      const analysisResult = hand.getAnalysisResult14()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

      test('手牌が14枚', () => {
        expect(hand.牌List().length).toBe(14)
      })
      test('シャンテン数が0', () => {
        const minimumShanten = Math.min(
          ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
        )
        expect(minimumShanten).toBe(0)
      })
      test('待ち牌が1枚以上', () => {
        const maximumWaitNum = Math.max(
          ...analysisResultValues.map(
            ({ analysisResult }) => analysisResult.remaining有効牌num.size,
          ),
        )
        expect(maximumWaitNum).toBeGreaterThanOrEqual(1)
      })
    })
    describe('waitNum === 3', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '1-9',
        waitNum: 1,
      })
      const analysisResult = hand.getAnalysisResult14()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

      test('手牌が14枚', () => {
        expect(hand.牌List().length).toBe(14)
      })
      test('シャンテン数が0', () => {
        const minimumShanten = Math.min(
          ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
        )
        expect(minimumShanten).toBe(0)
      })
      test('待ち牌が3枚以上', () => {
        const maximumWaitNum = Math.max(
          ...analysisResultValues.map(
            ({ analysisResult }) => analysisResult.remaining有効牌num.size,
          ),
        )
        expect(maximumWaitNum).toBeGreaterThanOrEqual(3)
      })
    })
  })
  describe('length', () => {
    describe('length === 7', () => {
      const hand = generateHand({
        length: 7,
        suit: 's',
        range: '1-9',
        waitNum: 0,
      })
      test('手牌が7+1枚', () => {
        expect(hand.牌List().length).toBe(8)
      })
    })
    describe('length === 10', () => {
      const hand = generateHand({
        length: 10,
        suit: 's',
        range: '1-9',
        waitNum: 0,
      })
      test('手牌が10+1枚', () => {
        expect(hand.牌List().length).toBe(11)
      })
    })
    describe('length === 13', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '1-9',
        waitNum: 0,
      })
      test('手牌が13+1枚', () => {
        expect(hand.牌List().length).toBe(14)
      })
    })
  })
  describe('suit', () => {
    describe('suit === "m"', () => {
      const hand = generateHand({
        length: 13,
        suit: 'm',
        range: '1-9',
        waitNum: 0,
      })
      test('牌がすべてマンズ', () => {
        expect(hand.牌List().every(p => p.suit === "m")).toBe(true)
      })
    })
    describe('suit === "p"', () => {
      const hand = generateHand({
        length: 13,
        suit: 'p',
        range: '1-9',
        waitNum: 0,
      })
      test('牌がすべてピンズ', () => {
        expect(hand.牌List().every(p => p.suit === "p")).toBe(true)
      })
    })
    describe('suit === "s"', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '1-9',
        waitNum: 0,
      })
      test('牌がすべてソーズ', () => {
        expect(hand.牌List().every(p => p.suit === "s")).toBe(true)
      })
    })
  })
  describe('range', () => {
    describe('range === "1-9"', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '1-9',
        waitNum: 0,
      })
      test('牌がすべて1-9', () => {
        expect(hand.牌List().every(p => p.number >= 1 && p.number <= 9)).toBe(true)
      })
    })
    describe('range === "2-8"', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '2-8',
        waitNum: 0,
      })
      test('牌がすべて2-8', () => {
        expect(hand.牌List().every(p => p.number >= 2 && p.number <= 8)).toBe(true)
      })
    })
    describe('range === "3-7"', () => {
      const hand = generateHand({
        length: 13,
        suit: 's',
        range: '3-7',
        waitNum: 0,
      })
      test('牌がすべて3-7', () => {
        expect(hand.牌List().every(p => p.number >= 3 && p.number <= 7)).toBe(true)
      })
    })
  })
})
