<template>
  <header class="mb-10">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold font-header text-dark-800 leading-tight">
        {{ title }}
      </h1>
      <button
        @click="hrStore.toggleDarkMode"
        class="p-2 rounded-lg bg-primary-200 hover:bg-primary-300 transition-colors"
        :class="{ 'bg-dark-600 hover:bg-dark-500': hrStore.darkmode }"
      >
        <span v-if="hrStore.darkmode" class="text-primary-100">☀️</span>
        <span v-else class="text-dark-800">🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useHrStore } from '@/stores/hr'
import { ref } from 'vue'

const title = ref('Dashboard')
const hrStore = useHrStore()
</script>
