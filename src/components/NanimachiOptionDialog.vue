<script setup lang="ts">
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'

import { visibleNanimachiOption } from '@/composables/dialogController'
import { length, range, suit, waitNum } from '@/composables/nanimachiOption'

defineEmits(['hide'])
</script>
<template>
  <Dialog
    v-model:visible="visibleNanimachiOption"
    modal
    header="設定"
    :dismissableMask="true"
    :style="{ 'min-width': '18rem' }"
    :breakpoints="{ '960px': '75vw', '640px': '85vw' }"
    @hide="$emit('hide')"
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
        <p class="font-bold">待ちの数</p>
        <div>
          <RadioButton
            v-model="waitNum"
            inputId="waitNum-0"
            name="0"
            :value="0"
          />
          <label for="waitNum-0">0〜<small>(含ノーテン)</small></label>
        </div>
        <div>
          <RadioButton
            v-model="waitNum"
            inputId="waitNum-1"
            name="1"
            :value="1"
          />
          <label for="waitNum-1">1〜<small>(テンパイ)</small></label>
        </div>
        <div>
          <RadioButton
            v-model="waitNum"
            inputId="waitNum-3"
            name="3"
            :value="3"
          />
          <label for="waitNum-3">3〜<small>(多面)</small></label>
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
@/composables/option@/composables/nanimachiOption
