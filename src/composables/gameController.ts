import { ref, watchEffect } from 'vue'
import type { Manzu, Pinzu, Sozu } from './PaiStr.type'
import { handNanimachi } from './generateHand'

export const answerNanimachi = ref<Manzu[] | Pinzu[] | Sozu[]>([])
watchEffect(() => {
  answerNanimachi.value.sort()
})

export const clearAnswerNanimachi = () => {
  answerNanimachi.value = []
}

export const judgeNanimachi = (): { result: 'correct' } | { result: 'wrong' } => {
  const correctAnswer = handNanimachi.value.getAnalysisResult13()
  if (correctAnswer === null) {
    throw new Error('手牌がおかしい')
  }

  return answerNanimachi.value.join().trim() ===
    correctAnswer.有効牌
      .map((p) => p.toString())
      .join()
      .trim()
    ? { result: 'correct' }
    : { result: 'wrong' }
}
