import { describe, it, expect, beforeEach } from 'vitest'
import { answerNanimachi, answerAll, clearAnswerNanimachi, judgeNanimachi } from './nanimachiAnswer'
import { hand } from './nanimachiHand'
import { 手牌 } from 'pairi'

describe('nanimachiAnswerのコンポーザブル', () => {
  beforeEach(() => {
    clearAnswerNanimachi()
  })
  describe('judgeNanimachi', () => {
    it('回答が正しいときcorrectを返す', () => {
      hand.value = new 手牌('1112345m')
      answerNanimachi.value = ['2m', '3m', '5m', '6m']
      expect(judgeNanimachi()).toEqual({ result: 'correct' })
    })
    it('回答が誤っているときwrongを返す', () => {
      hand.value = new 手牌('1112345m')
      answerNanimachi.value = ['1m', '2m']
      expect(judgeNanimachi()).toEqual({ result: 'wrong' })
    })
    it('4枚使いのイーシャンテンでないのにanswerAllがtrueのときwrongを返す', () => {
      hand.value = new 手牌('1112345m')
      answerAll.value = true
      expect(judgeNanimachi()).toEqual({ result: 'wrong' })
    })
    it('4枚使いのイーシャンテンのとき、answerAllがtrueのときcorrectを返す', () => {
      hand.value = new 手牌('1111456m')
      answerAll.value = true
      expect(judgeNanimachi()).toEqual({ result: 'correct' })
    })
    it('4枚使いのイーシャンテンのとき、answerAllがfalseのときwrongを返す', () => {
      hand.value = new 手牌('1111456m')
      expect(judgeNanimachi()).toEqual({ result: 'wrong' })
    })
  })
})
