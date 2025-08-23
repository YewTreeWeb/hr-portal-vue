<template>
  <div class="h-full">
    <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
    <form id="addLeave" @submit.prevent="submitRequest" class="my-[30px]">
      <div class="field">
        <label class="label">Date Submitted</label>
        <div class="control">
          <input
            type="date"
            class="input"
            name="submitted"
            value=""
            placeholder="Add submitted date"
            v-model="date"
            @blur="validateInput"
          />
        </div>
        <p class="help mb-[15px]">The date the leave was submitted to manager</p>
        <label class="label">Days</label>
        <div class="control">
          <input
            type="number"
            class="input"
            name="amount"
            step="any"
            min="1"
            value=""
            placeholder="Number of days"
            v-model="days"
            @blur="validateInput"
          />
        </div>
        <p class="help mb-[15px]">The amount of leave days requested</p>
      </div>
      <div class="field">
        <label class="label">Leave Type</label>
        <div class="control">
          <div class="select">
            <select name="leaveType" v-model="type" @change="validateSelect">
              <option v-bind:value="'null'">
                Choose type of leave
              </option>
              <option v-bind:value="'annual'">Annual Leave</option>
              <option v-bind:value="'birthday'">Birthday Leave</option>
              <option v-bind:value="'sick'">Sick Leave</option>
              <option v-bind:value="'medical'">Medical Leave</option>
            </select>
          </div>
        </div>
        <p class="help">What type of leave was requested?</p>
        <label class="label">Outcome</label>
        <div class="control">
          <div class="select">
            <select
              name="leaveOutcome"
              v-model="status"
              @change="validateSelect"
            >
              <option v-bind:value="'null'">
                Choose outcome of request
              </option>
              <option v-bind:value="'approved'">Approved</option>
              <option v-bind:value="'pending'">Pending</option>
              <option v-bind:value="'declined'">Declined</option>
            </select>
          </div>
        </div>
        <p class="help">
          Has the leave request been approved/denied or still wating reponse?
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            type="submit"
            @click="formSubmit(days, type, status)"
          >
            Submit
          </button>
        </div>
        <ul class="errors text-error" v-if="this.errors">
          <li v-if="errors.submit">
            ERROR! Please submit valid data. E.g Do not leave blank fields
          </li>
          <li v-if="errors.input">
            ERROR! Please enter valid data into the input field. E.g Do not
            leave blank
          </li>
          <li v-if="errors.select">
            ERROR! Please select a valid option. E.g Do not leave default option
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** Emits for submitting leave request */
const emit = defineEmits<{
  (e: 'submittedValues', payload: { id: number; days: string | number; type: string; status: string }): void
}>()

const title: string = 'Request Leave'
const id = ref<number>(0)
const date = ref<string>('')
const days = ref<string>('')
const type = ref<string>('')
const status = ref<string>('')

interface ErrorState { submit: boolean; input: boolean; select: boolean }
const errors = ref<ErrorState>({ submit: false, input: false, select: false })

function formSubmit(d: string, t: string, s: string): void {
  if (days.value !== '' && type.value !== 'null' && status.value !== 'null') {
    id.value += 1
    emit('submittedValues', { id: id.value, days: d, type: t, status: s })
  }
}

function submitRequest(e: Event): void {
  if (date.value !== '' && days.value !== '' && type.value !== 'null' && status.value !== 'null') {
    const form = e.target as HTMLFormElement | null
    console.log(e)
    if (form) form.reset()
  } else {
    errors.value.submit = !errors.value.submit
  }
}

function validateInput(): void {
  errors.value.submit = false
  if (date.value === '' || days.value === '') {
    errors.value.input = !errors.value.input
  } else {
    errors.value.input = false
  }
}

function validateSelect(): void {
  errors.value.submit = false
  if (type.value === 'null' || status.value === 'null') {
    errors.value.select = !errors.value.select
  } else {
    errors.value.select = false
  }
}
</script>
