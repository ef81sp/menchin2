<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'
import Checkbox from 'primevue/checkbox'
import { hand, generateHand, correctAnswerStrArr } from '@/composables/nanimachiHand'
import * as nanimachiOption from '@/composables/nanimachiOption'
import { showNanimachiExplanation, showNanimachiOption } from '@/composables/dialogController'
import NanimachiOption from '@/components/NanimachiOptionDialog.vue'
import NanimachiAnswerButton from '@/components/NanimachiAnswerButton.vue'
import { answerAll, clearAnswerNanimachi, judgeNanimachi } from '@/composables/nanimachiAnswer'
import { computed, ref, watch } from 'vue'
import NanimachiExplanationDialog from '@/components/NanimachiExplanationDialog.vue'
import { useMagicKeys } from '@vueuse/core'
import { reloadKeyStr, explainKeyStr, judgeKeyStr } from '@/composables/shortcutKey'
import NanimachiQuestion from '../components/NanimachiQuestion.vue'

const result = ref<string | null>(null)

const handleHideOption = () => {
  if (nanimachiOption.isChanged.value) {
    generateQuestion({ renew: true })
    nanimachiOption.save()
  }
}
const generateQuestion = ({ renew } = { renew: false }) => {
  result.value = null
  clearAnswerNanimachi()
  generateHand({ renew })
}

const judge = () => {
  const j = judgeNanimachi()
  if (j.result === 'correct') {
    result.value = '正解'
  } else {
    result.value = '不正解'
  }
}
// prettier-ignore
const { 
  numpadEnter, j,
  r, numpadAdd, 
  e, numpadSubtract
} = useMagicKeys()
watch([j, numpadEnter], (keys, prevKeys) => {
  if (prevKeys.some((k) => k) && keys.every((k) => !k)) {
    judge()
  }
})
watch([r, numpadAdd], (keys, prevKeys) => {
  if (prevKeys.some((k) => k) && keys.every((k) => !k)) {
    generateQuestion()
  }
})
watch([result, e, numpadSubtract], ([r, ...keys], [_, ...prevKeys]) => {
  if (r === null) {
    return
  }
  if (prevKeys.some((k) => k) && keys.every((k) => !k)) {
    showNanimachiExplanation()
  }
})

const title = computed(() => {
  switch (nanimachiOption.type.value) {
    case 'noten':
      return '何受け？'
    case 'gochamaze':
      return '何待ち or 何受け？'
    default:
      return '何待ち？'
  }
})

const showAllCheckbox = computed(
  () =>
    nanimachiOption.length.value === 13 &&
    (nanimachiOption.type.value === 'noten' || nanimachiOption.type.value === 'gochamaze'),
)
</script>

<template>
  <div class="*:mx-auto *:flex *:justify-center">
    <h2 class="m-3 text-center text-2xl">{{ title }}</h2>
    <NanimachiQuestion :hand="hand.普通" />
    <div class="my-2 gap-2">
      <Button
        @click="showNanimachiOption"
        label="設定"
        size="small"
        class="w-28"
        icon="pi pi-cog"
        severity="info"
      />
      <Button
        @click="() => generateQuestion()"
        :label="`別の問題 [${reloadKeyStr}]`"
        size="small"
        class="w-30"
        icon="pi pi-refresh"
        severity="info"
      />
      <NanimachiOption @hide="handleHideOption" />
    </div>
    <div class="mt-6 flex-col text-center md:w-4/5">
      <h3>選択欄 [1-9]</h3>
      <NanimachiAnswerButton />
      <p
        class="mt-2"
        v-if="showAllCheckbox"
      >
        <Checkbox
          v-model="answerAll"
          input-id="answer-all"
          :binary="true"
        />
        <label
          for="answer-all"
          class="ml-1 leading-4"
          >手牌にない牌すべて<br /><small
            >※(稀)チートイツで、何を引いてもシャンテン数が進むときだけ選択</small
          ></label
        >
      </p>
    </div>
    <div class="my-8 flex w-full flex-col items-center gap-y-2">
      <div class="*:text-sm">
        <p>※ノーテンの場合、有効牌を選んで「判定」ボタン</p>
        <p v-if="nanimachiOption.exclude5.value">
          ※回答に4枚使いの<strong>5枚目は含まない</strong>
        </p>
        <p v-else>※順子が完成する場合のみ、回答に4枚使いの<strong>5枚目も含む</strong></p>
        <p>※判定は何度でも可能(間違っても再チャレンジ)</p>
      </div>
    </div>
    <div>
      <Button
        @click="judge"
        :label="`判定 [${judgeKeyStr}]`"
        class="w-30"
        icon="pi pi-check"
      />
    </div>
    <div class="*:w-full *:sm:w-4/5">
      <Message
        severity="info"
        :closable="false"
        v-if="result === null"
        class="border-2"
        >結果がここに出ます</Message
      >
      <Message
        :severity="result === '不正解' ? 'error' : 'success'"
        :closable="false"
        v-else-if="result !== null"
        class="border-2"
        >{{ result }}</Message
      >
    </div>
    <div v-if="result !== null">
      <Button
        size="small"
        :label="`解説を見る [${explainKeyStr}]`"
        icon="pi pi-book"
        @click="showNanimachiExplanation"
      />
      <NanimachiExplanationDialog
        :hand="hand.普通.map((p) => p.toString())"
        :correctAnswer="correctAnswerStrArr"
        :analysis-result="hand.getAnalysisResult13()!"
      />
    </div>
  </div>
</template>
