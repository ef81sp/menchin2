<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'

import { computed, watchEffect } from 'vue'

import NanikiruAnswerButton from '@/components/NanikiruAnswerButton.vue'
import NanikiruExplanationDialog from '@/components/NanikiruExplanationDialog.vue'

import { 手牌, 牌 } from 'pairi'
import { answer, clearAnswer, judge, judgeResult } from '@/composables/nanikiruAnswer'
import { showNanikiruExplanation, showNanikiruOption } from '@/composables/dialogController'
import { hand, generateHand } from '@/composables/nanikiruHand'
import NanikiruOptionDialog from '@/components/NanikiruOptionDialog.vue'
import { isChanged, save } from '@/composables/nanikiruOption'

const analysisResult = computed(() => hand.value.getAnalysisResult14())

const handleHideOption = () => {
  if (isChanged.value) {
    generateQuestion()
    save()
  }
}

const generateQuestion = () => {
  clearAnswer()
  generateHand()
}
watchEffect(() => {
  if (answer.value === null) {
    return
  }
  const tsumo = hand.value.ツモ
  if (tsumo === null) {
    return
  }
  if (analysisResult.value === null) {
    return
  }
  judge(analysisResult.value, tsumo as 牌, answer.value)
})
</script>

<template>
  <div class="*:mx-auto *:flex *:justify-center">
    <h2 class="my-3 text-center text-2xl">何切る？</h2>
    <div class="my-2 gap-2">
      <Button
        @click="showNanikiruOption"
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
      <NanikiruOptionDialog @hide="handleHideOption" />
    </div>
    <div class="mt-6 flex-col items-center gap-4 text-center md:w-4/5">
      <h3>選択欄</h3>

      <NanikiruAnswerButton
        :hand="hand as 手牌"
        v-model="answer"
      />
      <Button
        label="ツモ"
        class="w-24"
        @click="answer = 'tsumo'"
      />
    </div>
    <div class="my-4 flex w-full flex-col items-center gap-y-2">
      <div class="*:text-sm">
        <p>※シャンテン数が最も低く、かつ有効牌(待ち牌)の最も多くなる牌を選んでクリック</p>
        <p>※アガリの場合、「ツモ」ボタン</p>
        <p>※判定は何度でも可能(間違っても再チャレンジ)</p>
      </div>
    </div>
    <div></div>
    <div class="*:w-full *:sm:w-4/5">
      <Message
        severity="info"
        :closable="false"
        v-if="judgeResult === null"
        class="border-2"
        >結果がここに出ます</Message
      >
      <Message
        :severity="judgeResult === '不正解' ? 'error' : 'success'"
        :closable="false"
        v-else-if="judgeResult !== null"
        class="border-2"
        >{{ judgeResult }}</Message
      >
    </div>
    <div v-if="judgeResult !== null">
      <Button
        size="small"
        label="解説を見る"
        icon="pi pi-book"
        @click="showNanikiruExplanation"
      />
      <NanikiruExplanationDialog
        v-if="analysisResult"
        :analysis-result="analysisResult"
        :tsumo="hand.ツモ as 牌"
        :hand="hand.牌List()"
      />
    </div>
  </div>
</template>
