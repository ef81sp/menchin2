<script setup lang="ts">
import { exclude5, length, suit, type } from '@/composables/nanimachiOption'
import { computed, onMounted, ref, type Ref } from 'vue'
import Nanimachi100Start from '@/components/Nanimachi100Start.vue'
import Nanimachi100CountDown from '@/components/Nanimachi100CountDown.vue'
import Nanimachi100Playing from '@/components/Nanimachi100Playing.vue'

import Nanimachi100Result from '@/components/Nanimachi100Result.vue'
import type { 手牌 } from 'pairi'
import type { PaiStr } from '@/composables/PaiStr.type'
import { generateCorrectAnswerStrArr, generateHand } from '@/composables/nanimachiHand'
import Nanimachi100ResultFurikaeri, {
  type Nanimachi100ResultFurikaeriProps,
} from '@/components/Nanimachi100ResultFurikaeri.vue'

const qAmount = ref(100)
const nowQuestion = ref(1)

const showTime = ref(true)

const scene = ref<'start' | 'countdown' | 'playing' | 'result'>('start')

const toStart = () => {
  scene.value = 'start'
}
const toPlaying = () => {
  scene.value = 'playing'
}

const toCountdown = () => {
  nowQuestion.value = 1
  scene.value = 'countdown'
}

const toResult = () => {
  finish()
  scene.value = 'result'
}

const useTimer = () => {
  const pastTime = ref(0)
  const pastTimeFormatted = computed(() => {
    const time = pastTime.value
    const min = Math.floor(time / 60000)
    const sec = (time % 60000) / 1000
    return `${String(min).padStart(2, '0')}:${sec.toFixed(1).padStart(4, '0')}`
  })

  let timer: number | null = null
  let startAt: number | null = null

  const start = () => {
    startAt = Date.now()
    // @ts-ignore なんかNodeJS.Timeoutが推論されるが、BrowserのsetIntervalを使っている
    timer = setInterval(() => {
      if (startAt !== null) {
        pastTime.value = Date.now() - startAt
      }
    }, 100)
  }

  const pause = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  const finish = () => {
    pause()
  }

  return { pastTime, pastTimeFormatted, start, pause, finish }
}
const { pastTime, pastTimeFormatted, start, finish } = useTimer()

// ===========================

type questionList = Omit<Nanimachi100ResultFurikaeriProps, 'index'>[]
const questionList = ref<questionList>([]) as Ref<questionList>

let previousTimeMs = 0
const handleCorrect = (hand: 手牌, answer: PaiStr[]) => {
  const timeMs = pastTime.value - previousTimeMs
  previousTimeMs = pastTime.value
  questionList.value.push({
    hand,
    answer,
    timeMs,
  })

  if (nowQuestion.value === qAmount.value) {
    toResult()
  } else {
    nowQuestion.value++
  }
}
</script>
<template>
  <div class="flex flex-col items-center gap-y-4">
    <h2 class="m-3 text-center text-2xl">何待ち100本ノック</h2>
    <Nanimachi100Start
      v-if="scene === 'start'"
      v-model:qAmount="qAmount"
      v-model:length="length"
      v-model:suit="suit"
      v-model:type="type"
      v-model:exclude5="exclude5"
      v-model:showTime="showTime"
      @start="toCountdown"
    />
    <Nanimachi100CountDown
      v-else-if="scene === 'countdown'"
      @countdown-finished="toPlaying"
    />
    <Nanimachi100Playing
      v-else-if="scene === 'playing'"
      :nowQuestion
      :wholeQuestion="qAmount"
      :isShowTime="showTime"
      :pastTime="pastTimeFormatted"
      @mounted="start"
      @correct="handleCorrect"
      @retire="toResult"
    />
    <Nanimachi100Result
      v-else-if="scene === 'result'"
      :qAmount="qAmount"
      :nowQuestion="nowQuestion"
      :time="pastTimeFormatted"
      :showTime="showTime"
      :type="type"
      :length="length"
      :questionList="questionList"
      @retry="toStart"
    />
  </div>
</template>

<style scoped></style>
