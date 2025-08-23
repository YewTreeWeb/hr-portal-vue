<template>
  <div class="min-h-[539px] mt-[38px]">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-4" v-if="!error">
        <div>
          <h2 class="text-3xl font-bold">{{ title }}</h2>
        </div>
        <div v-if="leaveRequests.length > 0">
          <div
            :id="`request-${index}`"
            class="flex items-center justify-between border-b border-grey-dark last:border-b-0 py-4"
            v-for="(request, index) in leaveRequests"
            :key="index"
          >
            <h4 class="text-lg font-medium">
              {{ formatDate(request.submitted) }}
              <small class="block text-grey-light">submitted</small>
            </h4>
            <p
              class="px-[15px] hover:cursor-pointer"
              ref="days"
              @click="makeEditable"
              contenteditable="true"
            >
              {{ request.days }}
            </p>
            <p class="capitalize">{{ request.type }}</p>
            <p
              class="px-[15px] hover:cursor-pointer"
              ref="status"
              @click="makeEditable"
              contenteditable="true"
            >
              {{ request.status }}
            </p>
            <p class="space-x-4">
              <button
                class="text-accent hover:text-accent-dark"
                @click="update(index)"
                :disabled="!editied"
              >
                Update
              </button>
              <button
                class="text-accent hover:text-accent-dark"
                @click="deleteLog(index)"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
        <div v-else>
          <p>There are currently no leave requests</p>
        </div>
      </div>
      <p v-else>{{ error }}</p>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

interface LeaveLogItem {
  id: string
  submitted?: string | number | Date
  days: string | number
  type: string
  status: string
}

const props = defineProps<{ leaveRequests: LeaveLogItem[]; error?: string }>()
const emit = defineEmits<{ (e: 'update', payload: { id: number; days: string; status: string }): void; (e: 'delete', payload: { id: number }): void }>()

const title: string = 'Leave'
const editied = ref<boolean>(false)
const days = ref<HTMLElement[]>([])
const status = ref<HTMLElement[]>([])

function formatDate(date?: string | number | Date): string {
  return date ? dayjs(date).format('DD/MM/YYYY') : ''
}

function makeEditable(e: Event): void {
  const target = e.target as HTMLElement
  if (!editied.value) {
    editied.value = true
    target?.focus()
  }
}

function update(id: number): void {
  const d = days.value?.[0]?.textContent?.trim() ?? ''
  const s = status.value?.[0]?.textContent?.trim() ?? ''
  emit('update', { id, days: d, status: s })
  editied.value = false
}

function deleteLog(id: number): void {
  emit('delete', { id })
}

const leaveRequests = props.leaveRequests
const error = props.error
</script>
