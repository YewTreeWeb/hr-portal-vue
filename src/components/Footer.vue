<template>
  <footer class="bg-dark-700 text-primary-100 py-8 mt-16">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm">
        © {{ currentYear }} HR Portal. Built with Vue 3, Pinia, and Tailwind CSS.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear())
</script>
