<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  type: '面子' | '搭子' | '対子' | '雀頭' | '単騎' | '雀頭候補' | 'くっつき' | '不要'
}>()

const color = computed<string>(() => {
  switch (props.type) {
    case '面子':
    case '雀頭':
      return 'green-500'
    case '搭子':
    case '対子':
    case '単騎':
      return 'yellow-500'
    case 'くっつき':
    case '雀頭候補':
      return 'blue-500'
    case '不要':
      return 'gray-500'
    default:
      return 'white'
  }
})
</script>
<template>
  <div
    class="flex justify-center pt-1"
    :class="`bg-gradient-to-b from-${color} to-40%`"
  >
    <p
      class="max-w-8 text-nowrap object-fill text-center text-xs md:text-sm"
      :class="{ 'origin-left scale-x-50': type.length > 2 }"
    >
      {{ type }}
    </p>
  </div>
</template>
