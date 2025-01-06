<script setup lang="ts">
import type { Type } from '@/composables/nanimachiOption'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import ShareDialog from '@/components/ShareDialog.vue'
import type { PaiStr } from '@/composables/PaiStr.type'
import type { 手牌 } from 'pairi'
import Nanimachi100ResultFurikaeri, {
  type Nanimachi100ResultFurikaeriProps,
} from './Nanimachi100ResultFurikaeri.vue'
import NanimachiExplanationDialog from './NanimachiExplanationDialog.vue'
import { showNanimachiExplanation } from '@/composables/dialogController'

const { time, nowQuestion, qAmount, type, length, questionList } = defineProps<{
  qAmount: number
  nowQuestion: number
  time: string
  showTime: boolean
  type: Type
  length: number
  questionList: Omit<Nanimachi100ResultFurikaeriProps, 'index'>[]
}>()

defineEmits(['retry'])

const shareDialog = useTemplateRef('shareDialog')

const result = computed(() => [
  { title: 'タイム', content: time },
  { title: '回答数', content: `${nowQuestion} / ${qAmount}` },
  { title: '問題モード', content: type === 'tamenmachi' ? '多面待ち' : '通常' },
  { title: '手牌枚数', content: length },
])

const isDone = computed(() => qAmount === nowQuestion)

const text = computed(
  () => `チンイツ #何待ち100本ノック を${isDone.value ? '完遂！' : 'リタイア……'}
タイム: ${time}
回答数: ${nowQuestion} / ${qAmount}
問題モード: ${type === 'tamenmachi' ? '多面待ち' : '通常'}
手牌枚数: ${length}`,
)
const url = 'https://menchin.p-craft.dev/'
const shareText = computed(
  () => `${text.value}
${url}`,
)
const handleShare = async () => {
  shareDialog.value?.open()
}

const selectedQuestionIndex = ref(0)
const selectedQuestionHand = computed(() =>
  questionList[selectedQuestionIndex.value].hand.普通.map((p) => p.toString()),
)
const selectedQuestionAnalysisResult = computed(
  () => questionList[selectedQuestionIndex.value].hand.getAnalysisResult13()!,
)
const selectedQuestionAnswer = computed(() => questionList[selectedQuestionIndex.value].answer)
const showExplanation = async (index: number) => {
  selectedQuestionIndex.value = index
  await nextTick()
  showNanimachiExplanation()
}
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4">
    <Card class="w-[90%] md:w-[80%]">
      <template #title> {{ qAmount === nowQuestion ? '完遂！！' : 'リタイア……' }} </template>
      <template #content>
        <div class="m-4 mx-auto grid grid-cols-2 gap-4 *:text-sm sm:grid-cols-2 md:grid-cols-3">
          <div
            class="flex flex-col gap-2 *:flex *:items-center *:justify-center *:gap-2"
            v-for="({ title, content }, i) in result"
            :key="i"
          >
            <h3>{{ title }}</h3>
            <p class="text-xl font-bold">
              {{ content }}
            </p>
          </div>
        </div>
      </template>
    </Card>
    <Button
      @click="handleShare"
      label="結果をシェア"
      icon="pi pi-share-alt"
      class="w-40"
    />
    <Button
      @click="$emit('retry')"
      severity="info"
      label="もう一度"
      icon="pi pi-refresh"
      class="w-40"
    />
    <Accordion
      v-if="questionList.length > 0"
      class="w-[90%] md:w-[80%]"
    >
      <AccordionTab header="振り返り">
        <NanimachiExplanationDialog
          :hand="selectedQuestionHand"
          :correctAnswer="selectedQuestionAnswer"
          :analysis-result="selectedQuestionAnalysisResult"
        />
        <ol>
          <Nanimachi100ResultFurikaeri
            v-for="({ hand, answer, timeMs: time, mistake }, i) in questionList"
            :key="i"
            :hand="hand"
            :answer="answer"
            :timeMs="time"
            :mistake="mistake"
            :index="i"
            @show-explaination="() => showExplanation(i)"
          />
        </ol>
      </AccordionTab>
    </Accordion>
    <ShareDialog
      ref="shareDialog"
      :shareText
    />
  </div>
</template>
