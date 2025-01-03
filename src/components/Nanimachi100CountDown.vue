<script setup lang="ts">
import { ref, onMounted } from 'vue'

const countdown = ref(3)

const emit = defineEmits(['countdown-finished'])

onMounted(() => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    } else {
      clearInterval(interval)
      // カウントダウンが終了したことを親コンポーネントに通知
      emit('countdown-finished')
    }
  }, 1000)
})
</script>

<template>
  <div class="countdown">
    <div
      v-if="countdown === 3"
      key="3"
      class="fade"
    >
      3
    </div>
    <div
      v-else-if="countdown === 2"
      key="2"
      class="fade"
    >
      2
    </div>
    <div
      v-else-if="countdown === 1"
      key="1"
      class="fade"
    >
      1
    </div>
    <div
      v-else
      key="start"
      class="fade"
    >
      Start!
    </div>
  </div>
</template>

<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
}

.fade {
  animation: fadeOut 1s forwards;
}

@keyframes fadeOut {
  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
