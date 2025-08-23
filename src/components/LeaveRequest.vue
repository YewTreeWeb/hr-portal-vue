<template>
  <div class="bg-white rounded-lg shadow-lg p-6 h-full">
    <h2 class="text-xl font-semibold text-dark-800 mb-6">{{ title }}</h2>
    <form class="mt-7" @submit.prevent="submitRequest">
      <div class="space-y-4 w-full">
        <div>
          <label class="block text-sm font-medium text-dark-700 mb-2">Date Submitted</label>
          <input
            type="date"
            class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="submitted"
            placeholder="Add submitted date"
            v-model="date"
            @blur="validateInput"
          />
          <p class="text-xs text-dark-500 mt-1 mb-4">The date the leave was submitted to manager</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-dark-700 mb-2">Days</label>
          <input
            type="number"
            class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="amount"
            step="any"
            min="1"
            placeholder="Number of days"
            v-model="days"
            @blur="validateInput"
          />
          <p class="text-xs text-dark-500 mt-1 mb-4">The amount of leave days requested</p>
        </div>
      </div>

      <div class="space-y-4 w-full">
        <div>
          <label class="block text-sm font-medium text-dark-700 mb-2">Leave Type</label>
          <select
            name="leaveType"
            v-model="type"
            @change="validateSelect"
            class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="null">Choose type of leave</option>
            <option value="annual">Annual Leave</option>
            <option value="birthday">Birthday Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="medical">Medical Leave</option>
          </select>
          <p class="text-xs text-dark-500 mt-1 mb-4">What type of leave was requested?</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-dark-700 mb-2">Outcome</label>
          <select
            name="leaveOutcome"
            v-model="status"
            @change="validateSelect"
            class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="null">Choose outcome of request</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
          <p class="text-xs text-dark-500 mt-1 mb-4">
            Has the leave request been approved/denied or still waiting response?
          </p>
        </div>
      </div>

      <div class="mt-6">
        <button
          class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          type="submit"
          @click="formSubmit(days, type, status)"
        >
          Submit
        </button>

        <ul class="mt-4 space-y-1" v-if="hasErrors">
          <li v-if="errors.submit" class="text-error text-sm">
            ERROR! Please submit valid data. E.g Do not leave blank fields
          </li>
          <li v-if="errors.input" class="text-error text-sm">
            ERROR! Please enter valid data into the input field. E.g Do not leave blank
          </li>
          <li v-if="errors.select" class="text-error text-sm">
            ERROR! Please select a valid option. E.g Do not leave default option
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const title = ref('Request Leave')
const id = ref(0)
const date = ref('')
const days = ref('')
const type = ref('null')
const status = ref('null')
const errors = ref({
  submit: false,
  input: false,
  select: false,
})

const emit = defineEmits(['submittedValues'])

const hasErrors = computed(() => {
  return errors.value.submit || errors.value.input || errors.value.select
})

const formSubmit = (days, type, status) => {
  if (days !== "" && type !== "null" && status !== "null") {
    emit("submittedValues", {
      id: (id.value += 1),
      days,
      type,
      status,
    })
  }
}

const submitRequest = (payload) => {
  if (
    date.value !== "" &&
    days.value !== "" &&
    type.value !== "null" &&
    status.value !== "null"
  ) {
    console.log(payload)
    payload.target.reset()
  } else {
    errors.value.submit = !errors.value.submit
  }
}

const validateInput = () => {
  errors.value.submit = false
  if (date.value === "" || days.value === "") {
    errors.value.input = !errors.value.input
  } else {
    errors.value.input = false
  }
}

const validateSelect = () => {
  errors.value.submit = false
  if (type.value === "null" || status.value === "null") {
    errors.value.select = !errors.value.select
  } else {
    errors.value.select = false
  }
}
</script>
