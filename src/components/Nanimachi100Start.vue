<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import Button from 'primevue/button'

const qAmount = defineModel<number>('qAmount', { required: true })
const length = defineModel<number>('length', { required: true })
const suit = defineModel<string>('suit', { required: true })
const type = defineModel<string>('type', { required: true })
const exclude5 = defineModel<boolean>('exclude5', { required: true })
const showTime = defineModel<boolean>('showTime', { required: true })

defineEmits(['start'])
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Card class="w-[90%] md:w-[75%]">
      <template #title> 設定 </template>
      <template #content>
        <div class="m-4 mx-auto grid grid-cols-2 gap-4 *:text-sm md:grid-cols-3">
          <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
            <p class="font-bold">問題数</p>
            <div>
              <RadioButton
                v-model="qAmount"
                inputId="q-10"
                name="10"
                :value="10"
              />
              <label for="q-10">10</label>
            </div>
            <div>
              <RadioButton
                v-model="qAmount"
                inputId="q-100"
                name="100"
                :value="100"
              />
              <label for="q-100">100</label>
            </div>
          </div>

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
            <p class="font-bold">出題タイプ</p>
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
          <div class="flex flex-col gap-2 *:flex *:items-center *:justify-start *:gap-2">
            <p class="font-bold">経過時間</p>
            <div>
              <Checkbox
                v-model="showTime"
                input-id="time"
                :binary="true"
              />
              <label for="time">表示する</label>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <Button
      size="large"
      class="w-36"
      @click="$emit('start')"
      >スタート！</Button
    >
  </div>
</template>
