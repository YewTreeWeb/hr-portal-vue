<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mt-10 min-h-[539px]">
    <div class="container">
      <div v-if="!error">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-dark-800">{{ title }}</h2>
        </div>
        <div v-if="leaveRequests.length > 0" class="space-y-4">
          <div
            v-for="(request, index) in leaveRequests"
            :key="index"
            :id="`request-${index}`"
            class="flex items-center justify-between py-4 border-b border-primary-300 last:border-b-0"
            :class="{
              'bg-primary-50': index % 2,
              'bg-accent-50': edited,
            }"
          >
            <div class="flex-1">
              <h4 class="font-medium text-dark-800">
                {{ formatDate(request.submitted) }}
                <small class="block text-sm text-primary-400">submitted</small>
              </h4>
            </div>
            <div class="flex-1 text-center">
              <p
                class="px-4 py-2 cursor-pointer hover:bg-primary-100 rounded"
                ref="days"
                @click="makeEditable"
                contenteditable="true"
              >
                {{ request.days }}
              </p>
            </div>
            <div class="flex-1 text-center">
              <p class="text-dark-600">{{ request.type }}</p>
            </div>
            <div class="flex-1 text-center">
              <p
                class="px-4 py-2 cursor-pointer hover:bg-primary-100 rounded"
                ref="status"
                @click="makeEditable"
                contenteditable="true"
              >
                {{ request.status }}
              </p>
            </div>
            <div class="flex-1 text-right">
              <button
                class="text-primary-600 hover:text-primary-800 mr-4 disabled:opacity-50"
                @click="update(index)"
                :disabled="!edited"
              >
                Update
              </button>
              <button
                class="text-error hover:text-red-700"
                @click="deleteLog(index)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-dark-500">There are currently no leave requests</p>
        </div>
      </div>
      <p v-else class="text-error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const props = defineProps({
  leaveRequests: Array,
  error: String,
})

const emit = defineEmits(['update', 'delete'])

const title = ref('Leave')
const days = ref('')
const status = ref('')
const edited = ref(false)

const formatDate = (date) => {
  if (date) {
    return dayjs(date).format('DD/MM/YYYY')
  }
}

const makeEditable = (e) => {
  console.log({
    days: `origin value ${days.value}`,
    status: `origin value ${status.value}`,
  })

  console.log(e.target)

  if (e.target.classList.contains('request__days')) {
    days.value = e.target.textContent
    console.log({ days: `saved value ${days.value}` })
  } else {
    status.value = e.target.textContent
    console.log({ status: `saved value ${status.value}` })
  }

  if (!edited.value) {
    edited.value = !edited.value
    e.target.focus()
  }
}

const update = (id) => {
  // Note: This implementation needs to be adjusted for Vue 3 template refs
  emit('update', {
    id,
    days: days.value,
    status: status.value,
  })
  edited.value = false
}

const deleteLog = (id) => {
  emit('delete', { id })
}
</script>
