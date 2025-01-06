<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'

import NanimachiQuestion from '@/components/NanimachiQuestion.vue'
import NanimachiAnswerButton from '@/components/NanimachiAnswerButton.vue'
import { onMounted, ref, watch, nextTick } from 'vue'
import { clearAnswerNanimachi, judgeNanimachi } from '@/composables/nanimachiAnswer'
import { hand, generateHand, correctAnswerStrArr } from '@/composables/nanimachiHand'
import { judgeKeyStr } from '@/composables/shortcutKey'
import { useMagicKeys } from '@vueuse/core'
import type { 手牌 } from 'pairi'
import type { PaiStr } from '@/composables/PaiStr.type'

const { pastTime } = defineProps<{
  nowQuestion: number
  wholeQuestion: number
  isShowTime: boolean
  pastTime: string
}>()

const emit = defineEmits<{
  mounted: []
  correct: [hand: 手牌, answer: PaiStr[]]
  retire: []
}>()

onMounted(() => {
  generateHand({ renew: true })
  emit('mounted')
})

const generateQuestion = () => {
  clearAnswerNanimachi()
  generateHand()
}

// const time = useDateFormat(timestamp, 'mm:ss.SSS')

const result = ref<string | null>(null)
const showResult = ref(false)
let timeoutId = 0
const judge = () => {
  clearTimeout(timeoutId)
  showResult.value = false
  nextTick(() => {
    // 次のtickで新しいMessageを表示
    const j = judgeNanimachi()
    if (j.result === 'correct') {
      result.value = '正解'
      emit('correct', hand.value, correctAnswerStrArr.value)
      generateQuestion()
    } else {
      result.value = '不正解'
    }
    showResult.value = true
    // @ts-ignore Nodejs.Timeout が推論されるが、BrowserのsetTimeoutを使っている
    timeoutId = setTimeout(() => {
      showResult.value = false
    }, 2000)
  })
}

// prettier-ignore
const { 
  numpadEnter, j,
} = useMagicKeys()
watch([j, numpadEnter], (keys, prevKeys) => {
  if (prevKeys.some((k) => k) && keys.every((k) => !k)) {
    judge()
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-y-4">
    <div class="grid grid-cols-3 items-center gap-x-4 font-mono">
      <div class="*:text-center">
        <div class="text-sm">問題数</div>
        <div class="text-xl">
          <span class="font-bold">{{ nowQuestion }}</span
          >/{{ wholeQuestion }}
        </div>
      </div>
      <Transition
        name="message-transition"
        mode="out-in"
      >
        <Message
          v-if="showResult"
          :severity="result === '不正解' ? 'error' : 'success'"
          :closable="false"
          class="border-2"
          :pt="{
            root: 'w-24 h-full !m-0 flex items-center',
            wrapper: '!py-0 !px-2',
            icon: '!w-4 !h-4',
          }"
          :pt-options="{ mergeProps: true, mergeSections: true }"
        >
          {{ result }}
        </Message>
        <div
          v-else
          class="h-full w-24"
        />
      </Transition>
      <div class="*:text-center">
        <div class="text-sm">経過時間</div>
        <div
          class="text-xl"
          v-if="isShowTime"
        >
          {{ pastTime }}
        </div>
        <div
          v-else
          class="text-xl"
        >
          --
        </div>
      </div>
    </div>

    <NanimachiQuestion
      :hand="hand.普通"
      class="w-full justify-center"
    />
    <div class="mt-6 flex-col text-center md:w-4/5">
      <h3>選択欄 [1-9]</h3>
      <NanimachiAnswerButton />
    </div>
    <div class="mt-6">
      <Button
        @click="judge"
        :label="`判定 [${judgeKeyStr}]`"
        class="w-30"
        icon="pi pi-check"
      />
    </div>
    <div class="mt-16">
      <Button
        severity="danger"
        size="small"
        :label="`リタイアする`"
        class="w-30"
        icon="pi pi-times-circle"
        @click="$emit('retire')"
      />
    </div>
  </div>
</template>

<style scoped>
.message-transition-enter-active {
  transition:
    transform 0.2s,
    opacity 0.2s;
}
.message-transition-leave-active {
  transition:
    transform 0.1s,
    opacity 0.1s;
}
.message-transition-enter-from {
  transform: translateY(30%);
  opacity: 0;
}
.message-transition-leave-to {
  transform: translateY(-30%);
  opacity: 0;
}
</style>
