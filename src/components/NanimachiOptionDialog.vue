<script setup lang="ts">
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

import { visibleNanimachiOption } from '@/composables/dialogController'
import { exclude5, length, range, suit, type } from '@/composables/nanimachiOption'

const emit = defineEmits(['hide'])
const handleHide = () => {
  emit('hide')
}
</script>
<template>
  <Dialog
    v-model:visible="visibleNanimachiOption"
    modal
    header="設定"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '960px': '75vw', '640px': '85vw' }"
    @hide="handleHide"
  >
    <div class="mx-auto mb-8 flex flex-wrap gap-8 *:text-sm sm:justify-start md:justify-center">
      <ul class="px-auto text-sm *:leading-4">
        <li>
          <strong>7枚形</strong>の練習には「枚数: <strong>7</strong>」「出題タイプ:
          <strong>多面待ち</strong>」
        </li>
        <li>「牌の範囲」は<strong>狭いほど難しい</strong>(密集するから)</li>
      </ul>
    </div>
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
          />
          <label for="range-28">2 - 8</label>
        </div>
        <div>
          <RadioButton
            v-model="range"
            inputId="range-37"
            name="3-7"
            value="3-7"
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
      <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
        <p class="font-bold">4枚使いの5枚目</p>
        <div>
          <Checkbox
            v-model="exclude5"
            input-id="exclude-5"
            :binary="true"
          />
          <label for="exclude-5">4枚使いの5枚目を回答に含めない</label>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        @click="visibleNanimachiOption = false"
        label="決定"
        class="w-16"
        size="small"
      />
    </template>
  </Dialog>
</template>
