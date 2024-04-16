<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  type: '面子' | '搭子' | '対子' | '雀頭' | '孤立'
}>()

const color = computed<string>(() => {
  switch (props.type) {
    case '面子':
    case '雀頭':
      return 'green-500'
    case '搭子':
    case '対子':
      return 'yellow-500'
    case '孤立':
      return 'blue-500'
    default:
      return 'white'
  }
})
</script>
<template>
  <p
    class="border-t-2 text-center pt-1"
    :class="`border-t-${color} bg-gradient-to-b from-${color} to-40%`"
  >
    {{ type }}
  </p>
</template>
