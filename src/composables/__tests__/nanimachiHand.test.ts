import { generateHand } from '../nanimachiHand'

describe('generateHand', () => {
  describe('type', () => {
    describe('type === "noten"', () => {
      const hand = generateHand({
        type: 'noten',
      })
      const analysisResult = hand.getAnalysisResult13()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      test('シャンテン数が1以上', () => {
        expect(analysisResult.シャンテン数).toBeGreaterThan(0)
      })
    })
    describe('type === "tempai"', () => {
      const hand = generateHand({
        type: 'tempai',
      })
      const analysisResult = hand.getAnalysisResult13()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      test('シャンテン数が0', () => {
        expect(analysisResult.シャンテン数).toBe(0)
      })
      test('待ち牌が1種以上', () => {
        expect(analysisResult.有効牌.length).toBeGreaterThanOrEqual(1)
      })
    })
    describe('type === "tamenmachi"', () => {
      const hand = generateHand({
        type: 'tamenmachi',
      })
      const analysisResult = hand.getAnalysisResult13()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      test('シャンテン数が0', () => {
        expect(analysisResult.シャンテン数).toBe(0)
      })
      test('待ち牌が3種以上', () => {
        expect(analysisResult.有効牌.length).toBeGreaterThanOrEqual(3)
      })
    })
    describe('type === "gochamaze"', () => {
      const hand = generateHand({
        type: 'gochamaze',
      })
      const analysisResult = hand.getAnalysisResult13()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      test('エラーが起きない', () => {
        expect(analysisResult.シャンテン数).toBeGreaterThanOrEqual(0)
      })
    })
  })
  describe('length', () => {
    describe('length === 7', () => {
      const hand = generateHand({
        length: 7,
      })
      test('手牌が7枚', () => {
        expect(hand.牌List().length).toBe(7)
      })
    })
    describe('length === 10', () => {
      const hand = generateHand({
        length: 10,
      })
      test('手牌が10枚', () => {
        expect(hand.牌List().length).toBe(10)
      })
    })
    describe('length === 13', () => {
      const hand = generateHand({
        length: 13,
      })
      test('手牌が13枚', () => {
        expect(hand.牌List().length).toBe(13)
      })
    })
  })
  describe('suit', () => {
    describe('suit === "m"', () => {
      const hand = generateHand({
        suit: 'm',
      })
      test('牌がすべてマンズ', () => {
        expect(hand.牌List().every((p) => p.suit === 'm')).toBe(true)
      })
    })
    describe('suit === "p"', () => {
      const hand = generateHand({
        suit: 'p',
      })
      test('牌がすべてピンズ', () => {
        expect(hand.牌List().every((p) => p.suit === 'p')).toBe(true)
      })
    })
    describe('suit === "s"', () => {
      const hand = generateHand({
        suit: 's',
      })
      test('牌がすべてソーズ', () => {
        expect(hand.牌List().every((p) => p.suit === 's')).toBe(true)
      })
    })
  })
  describe('range', () => {
    describe('range === "1-9"', () => {
      const hand = generateHand({
        range: '1-9',
      })
      test('牌がすべて1-9', () => {
        expect(hand.牌List().every((p) => p.number >= 1 && p.number <= 9)).toBe(true)
      })
    })
    describe('range === "2-8"', () => {
      const hand = generateHand({
        range: '2-8',
      })
      test('牌がすべて2-8', () => {
        expect(hand.牌List().every((p) => p.number >= 2 && p.number <= 8)).toBe(true)
      })
    })
    describe('range === "3-7"', () => {
      const hand = generateHand({
        range: '3-7',
      })
      test('牌がすべて3-7', () => {
        expect(hand.牌List().every((p) => p.number >= 3 && p.number <= 7)).toBe(true)
      })
    })
  })
})
