<script setup lang="ts">
import type { PaiStr } from '@/composables/PaiStr.type'
import VPai from './VPai.vue'
import type { ExtractResult5ブロック } from 'pairi/dist/手牌utils/手牌utils.type'
defineProps<{
  title: string
  blockList: Block[]
}>()

type Block = Janto | Mentsu | Tatsu
type Janto = ExtractResult5ブロック['雀頭']
type Mentsu = ExtractResult5ブロック['面子'][number]
type Tatsu = ExtractResult5ブロック['塔子'][number]
const blockToPaiStrList = (block: Janto | Mentsu | Tatsu): PaiStr[] => {
  if (block === null) {
    return []
  }
  return block.component.map((p) => p.toString())
}
</script>
<template>
  <div class="flex gap-x-2 lg:gap-x-4">
    <p class="flex min-w-fit items-center text-sm md:text-base lg:text-lg">{{ title }}</p>
    <div class="flex flex-wrap items-center gap-2 lg:gap-4">
      <div
        class="flex"
        v-for="(paiStrList, i) in blockList"
        :key="i"
      >
        <VPai
          v-for="(p, i) in blockToPaiStrList(paiStrList)"
          :pai-str="p"
          :key="i"
          class="w-5 md:w-8 lg:w-11"
        />
      </div>
    </div>
  </div>
</template>
