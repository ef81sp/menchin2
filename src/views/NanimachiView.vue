<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'
import Checkbox from 'primevue/checkbox'
import VPai from '@/components/VPai.vue'
import { hand, generateHand } from '@/composables/nanimachiHand'
import * as nanimachiOption from '@/composables/nanimachiOption'
import { showNanimachiExplanation, showNanimachiOption } from '@/composables/dialogController'
import NanimachiOption from '@/components/NanimachiOptionDialog.vue'
import NanimachiAnswerButton from '@/components/NanimachiAnswerButton.vue'
import { answerAll, clearAnswerNanimachi, judgeNanimachi } from '@/composables/nanimachiAnswer'
import { computed, ref } from 'vue'
import NanimachiExplanationDialog from '@/components/NanimachiExplanationDialog.vue'

const result = ref<string | null>(null)

const handleHideOption = () => {
  if (nanimachiOption.isChanged.value) {
    generateQuestion()
    nanimachiOption.save()
  }
}
const generateQuestion = () => {
  result.value = null
  clearAnswerNanimachi()
  generateHand()
}

const judge = () => {
  const j = judgeNanimachi()
  if (j.result === 'correct') {
    result.value = '正解'
  } else {
    result.value = '不正解'
  }
}

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
    <div class="my-4 *:w-[calc(100%/14)]">
      <VPai
        :pai-str="pai.toString()"
        v-for="(pai, i) in hand.普通"
        :key="i"
        class="sm:w-10 md:w-12 lg:w-14"
      />
    </div>
    <div class="my-2 gap-2">
      <Button
        @click="showNanimachiOption"
        label="設定"
        size="small"
        class="w-24"
        icon="pi pi-cog"
        severity="info"
      />
      <Button
        @click="generateQuestion"
        label="別の問題"
        size="small"
        class="w-24"
        icon="pi pi-refresh"
        severity="info"
      />
      <NanimachiOption @hide="handleHideOption" />
    </div>
    <div class="mt-6 flex-col text-center md:w-4/5">
      <h3>選択欄</h3>
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
        label="判定"
        class="w-24"
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
        label="解説を見る"
        icon="pi pi-book"
        @click="showNanimachiExplanation"
      />
      <NanimachiExplanationDialog :analysis-result="hand.getAnalysisResult13()!" />
    </div>
  </div>
</template>
