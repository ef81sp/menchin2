<script setup lang="ts">
// 画像: 麻雀豆腐 https://majandofu.com/mahjong-images
import { computed } from 'vue'

const props = defineProps<{
  paiStr: keyof typeof imgPath
}>()

const imgPath = {
  '1z': 'ji1-66-90-l-emb.png',
  '2z': 'ji2-66-90-l-emb.png',
  '3z': 'ji3-66-90-l-emb.png',
  '4z': 'ji4-66-90-l-emb.png',
  '5z': 'ji5-66-90-l-emb.png',
  '6z': 'ji6-66-90-l-emb.png',
  '7z': 'ji7-66-90-l-emb.png',
  '1m': 'man1-66-90-l-emb.png',
  '2m': 'man2-66-90-l-emb.png',
  '3m': 'man3-66-90-l-emb.png',
  '4m': 'man4-66-90-l-emb.png',
  '5m': 'man5-66-90-l-emb.png',
  '6m': 'man6-66-90-l-emb.png',
  '7m': 'man7-66-90-l-emb.png',
  '8m': 'man8-66-90-l-emb.png',
  '9m': 'man9-66-90-l-emb.png',
  '1p': 'pin1-66-90-l-emb.png',
  '2p': 'pin2-66-90-l-emb.png',
  '3p': 'pin3-66-90-l-emb.png',
  '4p': 'pin4-66-90-l-emb.png',
  '5p': 'pin5-66-90-l-emb.png',
  '6p': 'pin6-66-90-l-emb.png',
  '7p': 'pin7-66-90-l-emb.png',
  '8p': 'pin8-66-90-l-emb.png',
  '9p': 'pin9-66-90-l-emb.png',
  '1s': 'sou1-66-90-l-emb.png',
  '2s': 'sou2-66-90-l-emb.png',
  '3s': 'sou3-66-90-l-emb.png',
  '4s': 'sou4-66-90-l-emb.png',
  '5s': 'sou5-66-90-l-emb.png',
  '6s': 'sou6-66-90-l-emb.png',
  '7s': 'sou7-66-90-l-emb.png',
  '8s': 'sou8-66-90-l-emb.png',
  '9s': 'sou9-66-90-l-emb.png',
}

const src = computed(() => '/pai-images/' + imgPath[props.paiStr])
</script>

<template>
  <!-- なんか短縮記法(:srcとだけ書くやつ)がTSに怒られる -->
  <img
    :src="src"
    :alt="paiStr"
    class="inline-block w-[calc(100%/14)]"
  />
</template>
