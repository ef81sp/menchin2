import { sortAnalysisResult14 } from '@/utils/sortAnalysisResult14'
import { generateHand } from './nanikiruHand'
import { describe, expect, it } from 'vitest'

describe('generateHand', () => {
  describe('type', () => {
    describe('type === "noten', () => {
      const hand = generateHand({
        length: 13,
        type: 'noten',
      })
      const analysisResult = hand.getAnalysisResult14()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

      it('シャンテン数が1以上', () => {
        const minimumShanten = Math.min(
          ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
        )
        expect(minimumShanten).toBeGreaterThan(0)
      })
    })
    describe('type === "tempai', () => {
      const hand = generateHand({
        length: 13,
        type: 'tempai',
      })
      const analysisResult = hand.getAnalysisResult14()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

      it('手牌が14枚', () => {
        expect(hand.牌List().length).toBe(14)
      })
      it('シャンテン数が0', () => {
        const minimumShanten = Math.min(
          ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
        )
        expect(minimumShanten).toBe(0)
      })
      it('待ち牌が1枚以上', () => {
        const maximumWaitNum = Math.max(
          ...analysisResultValues.map(
            ({ analysisResult }) => analysisResult.remaining有効牌num.size,
          ),
        )
        expect(maximumWaitNum).toBeGreaterThanOrEqual(1)
      })
    })

    describe('type === "tamenmachi"', () => {
      const hand = generateHand({
        length: 13,
        type: 'tamenmachi',
      })
      const analysisResult = hand.getAnalysisResult14()
      if (analysisResult === null) {
        throw new Error('analysisResultがnull')
      }
      const analysisResultValues = sortAnalysisResult14(analysisResult).map(([, v]) => v)

      it('手牌が14枚', () => {
        expect(hand.牌List().length).toBe(14)
      })
      it('シャンテン数が0', () => {
        const minimumShanten = Math.min(
          ...analysisResultValues.map(({ analysisResult }) => analysisResult.シャンテン数),
        )
        expect(minimumShanten).toBe(0)
      })
      it('待ち牌が3枚以上', () => {
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
      })
      it('手牌が7+1枚', () => {
        expect(hand.牌List().length).toBe(8)
      })
    })
    describe('length === 10', () => {
      const hand = generateHand({
        length: 10,
      })
      it('手牌が10+1枚', () => {
        expect(hand.牌List().length).toBe(11)
      })
    })
    describe('length === 13', () => {
      const hand = generateHand({
        length: 13,
      })
      it('手牌が13+1枚', () => {
        expect(hand.牌List().length).toBe(14)
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
})
