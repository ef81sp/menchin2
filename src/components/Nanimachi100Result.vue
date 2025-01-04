<script setup lang="ts">
import type { Type } from '@/composables/nanimachiOption'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { computed, useTemplateRef } from 'vue'
import ShareDialog from '@/components/ShareDialog.vue'

const { time, nowQuestion, qAmount, type, length } = defineProps<{
  qAmount: number
  nowQuestion: number
  time: string
  showTime: boolean
  type: Type
  length: number
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
const url = 'https://menchin.p_craft.dev/nanimachi100'
const shareText = computed(
  () => `${text.value}
${url}`,
)
const handleShare = async () => {
  const isSP = navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)
  if (isSP) {
    await navigator.share({
      title: '何待ち100本ノック',
      text: text.value,
      url,
    })
    return
  } else {
    shareDialog.value?.open()
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4">
    <Card class="w-[75%]">
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
    <ShareDialog
      ref="shareDialog"
      :text
      :url
      :shareText
    />
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
  </div>
</template>
