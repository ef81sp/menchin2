<script setup lang="ts">
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'
import HelpMain from '@/components/HelpMain.vue'
import HelpChangeLog from '@/components/HelpChangeLog.vue'
</script>

<template>
  <Card class="mx-auto my-3 h-[80svh] w-5/6 bg-slate-50">
    <template #title>
      <h2 class="text-2xl">ヘルプ (このアプリについて)</h2>
    </template>
    <template #content>
      <ScrollPanel class="h-[60svh] w-full p-2 md:h-[70svh]">
        <HelpMain />
        <HelpChangeLog />
      </ScrollPanel>
    </template>
  </Card>
</template>
