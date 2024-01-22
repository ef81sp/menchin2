<script setup lang="ts">
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'

import { visibleNanikiruOption } from '@/composables/dialogController'
import { length, range, suit, type } from '@/composables/nanikiruOption'
import { computed, ref } from 'vue'

const emit = defineEmits(['hide'])

const validate = () => {
  if (isRange3to7or2to8.value && isTypeNotenOrGochamaze.value) {
    return false
  }
  return true
}
const handleHide = () => {
  if (!validate()) {
    return
  }
  emit('hide')
}

const isRange3to7or2to8 = computed(() => range.value === '3-7' || range.value === '2-8')
const isTypeNotenOrGochamaze = computed(() => type.value === 'noten' || type.value === 'gochamaze')
const validateMessage = computed(() => {
  const description37 = `3-7の牌を${length.value + 1}枚選ぶと、必ずテンパイします。`
  const description28 =
    length.value === 13
      ? '2-8の牌を14枚選ぶと、必ずテンパイします。'
      : `2-8の牌を${length.value + 1}枚選ぶと、ほとんどのケースでテンパイします。`
  if (range.value === '3-7') {
    return `牌の範囲が「3-7」の場合、出題タイプは「テンパイ」もしくは「多面待ち」だけ選べます。${description37}`
  }
  if (range.value === '2-8') {
    return `牌の範囲が「2-8」の場合、出題タイプは「テンパイ」もしくは「多面待ち」だけ選べます。${description28}`
  }
  if (type.value === 'noten') {
    return `出題タイプが「ノーテンのみ」の場合、牌の範囲は「1-9」だけ選べます。${description28}${description37}`
  }
  if (type.value === 'gochamaze') {
    return `出題タイプが「ごちゃまぜ」の場合、牌の範囲は「1-9」だけ選べます。${description28}${description37}`
  }
  return ''
})
</script>
<template>
  <Dialog
    v-model:visible="visibleNanikiruOption"
    modal
    header="設定"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '960px': '75vw', '640px': '85vw' }"
    @hide="handleHide"
  >
    <div class="m-4 mx-auto flex flex-wrap gap-8 *:text-sm sm:justify-start md:justify-center">
      <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
        <p class="font-bold">枚数</p>
        <div>
          <RadioButton
            v-model="length"
            inputId="length-7"
            name="7"
            :value="7"
          />
          <label for="length-7">7</label>
        </div>
        <div>
          <RadioButton
            v-model="length"
            inputId="length-10"
            name="10"
            :value="10"
          />
          <label for="length-10">10</label>
        </div>
        <div>
          <RadioButton
            v-model="length"
            inputId="length-13"
            name="13"
            :value="13"
          />
          <label for="length-13">13</label>
        </div>
      </div>

      <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
        <p class="font-bold">牌の範囲</p>
        <div>
          <RadioButton
            v-model="range"
            inputId="range-19"
            name="1-9"
            value="1-9"
          />
          <label for="range-19">1 - 9</label>
        </div>
        <div>
          <RadioButton
            v-model="range"
            inputId="range-28"
            name="2-8"
            value="2-8"
            :disabled="isTypeNotenOrGochamaze"
          />
          <label for="range-28">2 - 8</label>
        </div>
        <div>
          <RadioButton
            v-model="range"
            inputId="range-37"
            name="3-7"
            value="3-7"
            :disabled="isTypeNotenOrGochamaze"
          />
          <label for="range-37">3 - 7</label>
        </div>
      </div>

      <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
        <p class="font-bold">出題タイプ</p>
        <div>
          <RadioButton
            v-model="type"
            inputId="type-noten"
            name="noten"
            :value="'noten'"
            :disabled="isRange3to7or2to8"
          />
          <label for="type-noten">ノーテンのみ</label>
        </div>
        <div>
          <RadioButton
            v-model="type"
            inputId="type-tempai"
            name="tempai"
            :value="'tempai'"
          />
          <label for="type-tempai">テンパイ<small>(1種以上)</small></label>
        </div>
        <div>
          <RadioButton
            v-model="type"
            inputId="type-tamenmachi"
            name="tamenmachi"
            :value="'tamenmachi'"
          />
          <label for="type-tamenmachi">多面待ち<small>(3種以上)</small></label>
        </div>
        <div>
          <RadioButton
            v-model="type"
            inputId="type-gochamaze"
            name="gochamaze"
            :value="'gochamaze'"
            :disabled="isRange3to7or2to8"
          />
          <label for="type-gochamaze">ごちゃまぜ</label>
        </div>
      </div>

      <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
        <p class="font-bold">牌種</p>
        <div>
          <RadioButton
            v-model="suit"
            inputId="suit-m"
            name="m"
            value="m"
          />
          <label for="suit-m">マンズ</label>
        </div>
        <div>
          <RadioButton
            v-model="suit"
            inputId="suit-p"
            name="p"
            value="p"
          />
          <label for="suit-p">ピンズ</label>
        </div>
        <div>
          <RadioButton
            v-model="suit"
            inputId="suit-s"
            name="s"
            value="s"
          />
          <label for="suit-s">ソーズ</label>
        </div>
      </div>
    </div>
    <div>
      <p class="text-center text-sm">{{ validateMessage }}</p>
    </div>
    <template #footer>
      <Button
        @click="visibleNanikiruOption = false"
        label="決定"
        class="w-16"
        size="small"
      />
    </template>
  </Dialog>
</template>
