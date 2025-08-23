<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="(leave, index) in filteredTypes"
      :key="index"
      class="bg-white rounded-lg shadow-lg p-6"
    >
      <article class="card">
        <h2 class="text-xl font-semibold text-dark-800 mb-4">{{ capitalise(leave.type) }} Leave</h2>
        <ul class="space-y-2 mt-5">
          <li class="text-sm text-dark-600 mt-0 font-bold">
            <span class="text-lg font-bold text-accent-600">{{ leave.available }}</span>
            days available
          </li>
          <li class="text-sm text-dark-600 mt-2.5 mb-1.5">
            <span class="text-lg font-bold text-primary-600">{{ leave.approved }}</span>
            days approved
          </li>
          <li class="text-sm text-dark-600 mt-2.5 mb-1.5">
            <span class="text-lg font-bold text-error">{{ leave.declined }}</span>
            days declined
          </li>
          <li class="text-sm text-dark-600 mt-2.5 mb-1.5">
            <span class="text-lg font-bold text-accent-500">{{ leave.remaining }}</span>
            days remaining
          </li>
        </ul>
      </article>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <article class="card">
        <h2 class="text-xl font-semibold text-dark-800 mb-4">Sick & Medical Leave</h2>
        <ul class="space-y-2 mt-5">
          <li
            v-for="(leave, index) in companyLeave"
            :key="index"
            class="text-sm text-dark-600 mt-2.5 mb-1.5"
          >
            <p v-if="leave.type !== 'birthday' && leave.type !== 'annual'">
              {{ capitalise(leave.type) }}:
              <span class="text-lg font-bold text-dark-800 ml-2">{{ leave.days }}</span>
              days
            </p>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  companyLeave: Array,
})

const filteredTypes = computed(() => {
  return props.companyLeave.filter((leave) => {
    return leave.type !== "sick" && leave.type !== "medical"
  })
})

const capitalise = (string) => {
  const capitalFirst = string.charAt(0).toUpperCase()
  const noCaseTail = string.slice(1, string.length)
  return capitalFirst + noCaseTail
}
</script>

<style scoped>
.is-center {
  text-align: center;
}
</style>
