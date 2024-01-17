<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'
import VPai from '@/components/VPai.vue'
import { handNanimachi, generateHandNanimachi } from '@/composables/generateHand'
import { showNanimachiExplanation, showNanimachiOption } from '@/composables/dialogController'
import NanimachiOption from '@/components/NanimachiOptionDialog.vue'
import NanimachiAnswerButton from '@/components/NanimachiAnswerButton.vue'
import { clearAnswerNanimachi, judgeNanimachi } from '@/composables/gameController'
import { ref } from 'vue'
import NanimachiExplanationDialog from '@/components/NanimachiExplanationDialog.vue'

const result = ref<string | null>(null)
const generateQuestion = () => {
  result.value = null
  clearAnswerNanimachi()
  generateHandNanimachi()
}

const judge = () => {
  const j = judgeNanimachi()
  if (j.result === 'correct') {
    result.value = '正解'
  } else {
    result.value = '不正解'
  }
}
</script>

<template>
  <div class="*:mx-auto *:flex *:justify-center">
    <h2 class="m-3 text-center text-2xl">何待ち？</h2>
    <div class="my-4 *:w-[calc(100%/14)]">
      <VPai
        :pai-str="pai.toString()"
        v-for="(pai, i) in handNanimachi.普通"
        :key="i"
      />
    </div>
    <div class="my-2 gap-2">
      <Button
        @click="showNanimachiOption"
        label="設定"
        size="small"
        class="w-24"
        icon="pi pi-cog"
      />
      <Button
        @click="generateQuestion"
        label="別の問題"
        size="small"
        class="w-24"
        icon="pi pi-refresh"
      />
      <NanimachiOption @hide="generateQuestion" />
    </div>
    <div class="mt-6 flex-col text-center md:w-4/5">
      <h3>選択欄</h3>
      <NanimachiAnswerButton />
    </div>
    <div class="my-4 flex w-full flex-col items-center gap-y-2">
      <div class="*:text-sm">
        <p>※ノーテンの場合、有効牌を選んで「判定」ボタン</p>
        <p>※4枚使いの5枚目も回答に含む</p>
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
      <NanimachiExplanationDialog v-bind="handNanimachi.getAnalysisResult13()!.analysisResult" />
    </div>
  </div>
</template>
