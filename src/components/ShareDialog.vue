<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { ref, computed, useId } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  shareText: string
}>()

const emit = defineEmits(['hide'])

const visible = ref(false)
const open = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
  emit('hide')
}
defineExpose({
  open,
  hide,
})

const { copy } = useClipboard()
const handleCopy = () => {
  copy(props.shareText)
  alert('コピーしました')
}
const isSP = navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)

const shareOnXUrl = computed(
  () => `https://x.com/intent/tweet?text=${encodeURIComponent(props.shareText)}`,
)
const shareOnBlueskyUrl = computed(
  () =>
    `${isSP ? 'bluesky://' : 'https://bsky.app/'}intent/compose?text=${encodeURIComponent(props.shareText.split('\n').join(' | '))}`,
)

const textareaId = useId()
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="共有"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '960px': '75vw', '640px': '85vw' }"
    @hide="hide"
  >
    <div class="mx-auto mb-8 flex flex-wrap gap-2 *:text-sm sm:justify-start md:justify-center">
      <label :for="textareaId">共有テキスト (ここでは編集不可)</label>
      <textarea
        :id="textareaId"
        class="h-32 w-full rounded-md border border-gray-300 p-2 text-sm"
        :value="shareText"
        readonly
      />
    </div>
    <div class="flex justify-center gap-4">
      <button
        size="small"
        class="p-button-sm inline-block rounded bg-gray-500 px-4 py-2 text-center text-white no-underline"
        @click="handleCopy"
      >
        コピー
      </button>
      <a
        :href="shareOnXUrl"
        target="_blank"
        class="p-button p-button-sm inline-block rounded bg-black px-4 py-2 text-center text-white no-underline"
      >
        X
      </a>
      <a
        :href="shareOnBlueskyUrl"
        target="_blank"
        class="p-button p-button-sm inline-block rounded bg-[rgb(18,133,254)] px-4 py-2 text-center text-white no-underline"
      >
        Bluesky
      </a>
    </div>
  </Dialog>
</template>
