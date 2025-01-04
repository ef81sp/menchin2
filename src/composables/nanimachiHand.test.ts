import { nextTick } from 'vue'
import { correctAnswerStrArr, generateCorrectAnswerStrArr, generateHand } from './nanimachiHand'
import { describe, expect, it, type TestFunction } from 'vitest'

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
      it('シャンテン数が1以上', () => {
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
      it('シャンテン数が0', () => {
        expect(analysisResult.シャンテン数).toBe(0)
      })
      it('待ち牌が1種以上', () => {
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
      it('シャンテン数が0', () => {
        expect(analysisResult.シャンテン数).toBe(0)
      })
      it('待ち牌が3種以上', () => {
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
      it('エラーが起きない', () => {
        expect(analysisResult.シャンテン数).toBeGreaterThanOrEqual(0)
      })
    })
  })
  describe('length', () => {
    describe('length === 7', () => {
      const hand = generateHand({
        length: 7,
      })
      it('手牌が7枚', () => {
        expect(hand.牌List().length).toBe(7)
      })
    })
    describe('length === 10', () => {
      const hand = generateHand({
        length: 10,
      })
      it('手牌が10枚', () => {
        expect(hand.牌List().length).toBe(10)
      })
    })
    describe('length === 13', () => {
      const hand = generateHand({
        length: 13,
      })
      it('手牌が13枚', () => {
        expect(hand.牌List().length).toBe(13)
      })
    })
  })
  describe('suit', () => {
    describe('suit === "m"', () => {
      const hand = generateHand({
        suit: 'm',
      })
      it('牌がすべてマンズ', () => {
        expect(hand.牌List().every((p) => p.suit === 'm')).toBe(true)
      })
    })
    describe('suit === "p"', () => {
      const hand = generateHand({
        suit: 'p',
      })
      it('牌がすべてピンズ', () => {
        expect(hand.牌List().every((p) => p.suit === 'p')).toBe(true)
      })
    })
    describe('suit === "s"', () => {
      const hand = generateHand({
        suit: 's',
      })
      it('牌がすべてソーズ', () => {
        expect(hand.牌List().every((p) => p.suit === 's')).toBe(true)
      })
    })
  })
  describe('range', () => {
    describe('range === "1-9"', () => {
      const hand = generateHand({
        range: '1-9',
      })
      it('牌がすべて1-9', () => {
        expect(hand.牌List().every((p) => p.number >= 1 && p.number <= 9)).toBe(true)
      })
    })
    describe('range === "2-8"', () => {
      const hand = generateHand({
        range: '2-8',
      })
      it('牌がすべて2-8', () => {
        expect(hand.牌List().every((p) => p.number >= 2 && p.number <= 8)).toBe(true)
      })
    })
    describe('range === "3-7"', () => {
      const hand = generateHand({
        range: '3-7',
      })
      it('牌がすべて3-7', () => {
        expect(hand.牌List().every((p) => p.number >= 3 && p.number <= 7)).toBe(true)
      })
    })
  })
  describe.concurrent(
    '多面待ちで5枚目除外のときに4枚使いがあってもちゃんと3種類以上待ちがある',
    () => {
      const testFn: TestFunction = async ({ expect }) => {
        const hand = generateHand({
          type: 'tamenmachi',
          exclude5: true,
          renew: true,
        })
        const yuuko = generateCorrectAnswerStrArr(hand.getAnalysisResult13()!)
        expect(yuuko.length).toBeGreaterThanOrEqual(3)
      }
      it('001', testFn)
      it('002', testFn)
      it('003', testFn)
      it('004', testFn)
      it('005', testFn)
      it('006', testFn)
      it('007', testFn)
      it('008', testFn)
      it('009', testFn)
      it('010', testFn)
      it('011', testFn)
      it('012', testFn)
      it('013', testFn)
      it('014', testFn)
      it('015', testFn)
      it('016', testFn)
      it('017', testFn)
      it('018', testFn)
      it('019', testFn)
      it('020', testFn)
      it('021', testFn)
      it('022', testFn)
      it('023', testFn)
      it('024', testFn)
      it('025', testFn)
      it('026', testFn)
      it('027', testFn)
      it('028', testFn)
      it('029', testFn)
      it('030', testFn)
      it('031', testFn)
      it('032', testFn)
      it('033', testFn)
      it('034', testFn)
      it('035', testFn)
      it('036', testFn)
      it('037', testFn)
      it('038', testFn)
      it('039', testFn)
      it('040', testFn)
      it('041', testFn)
      it('042', testFn)
      it('043', testFn)
      it('044', testFn)
      it('045', testFn)
      it('046', testFn)
      it('047', testFn)
      it('048', testFn)
      it('049', testFn)
      it('050', testFn)
    },
  )
})
