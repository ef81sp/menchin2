import { ref, watchEffect } from 'vue'
import type { Manzu, Pinzu, Sozu } from './PaiStr.type'
import { hand } from './nanimachiHand'

export const answerNanimachi = ref<Manzu[] | Pinzu[] | Sozu[]>([])
watchEffect(() => {
  answerNanimachi.value.sort()
})
export const answerAll = ref<boolean>(false)

export const clearAnswerNanimachi = () => {
  answerNanimachi.value = []
  answerAll.value = false
}

export const judgeNanimachi = (): { result: 'correct' } | { result: 'wrong' } => {
  const correctAnswer = hand.value.getAnalysisResult13()
  if (correctAnswer === null) {
    throw new Error('手牌がおかしい')
  }

  // 4枚使いのイーシャンテンのとき、単騎の牌なんでもOKのケースがある
  if (correctAnswer.シャンテン数 >= 1 && correctAnswer.有効牌.length >= 10) {
    return answerAll.value ? { result: 'correct' } : { result: 'wrong' }
  }
  if (answerAll.value) {
    return { result: 'wrong' }
  }
  return answerNanimachi.value.join().trim() ===
    correctAnswer.有効牌
      .map((p) => p.toString())
      .join()
      .trim()
    ? { result: 'correct' }
    : { result: 'wrong' }
}
