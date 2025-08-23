<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
    <div v-for="(leave, index) in annualBirthday" :key="`ab-${index}`">
      <article class="card card-equal">
        <h2 class="text-2xl font-bold mb-2">{{ capitalise(leave.type) }} Leave</h2>
        <ul class="mt-5">
          <li class="my-2 first:font-bold first:text-lg first:mt-0">
            <span ref="leaveAvailable">{{ leave.available }}</span>
            days available
          </li>
          <li class="my-2">
            <span ref="leaveApproved">{{ leave.approved }}</span>
            days approved
          </li>
          <li class="my-2">
            <span ref="leaveDeclined">{{ leave.declined }}</span>
            days declined
          </li>
          <li class="my-2">
            <span ref="leaveRemaining">{{ leave.remaining }}</span>
            days remaining
          </li>
        </ul>
      </article>
    </div>
    <div>
      <article class="card card-equal">
        <h2 class="text-2xl font-bold mb-2">Sick & Medical Leave</h2>
        <ul class="mt-5">
          <li v-for="(leave, index) in sickMedical" :key="`sm-${index}`">
            <p class="my-2">
              {{ leave.type }}
              <span ref="leaveUsed">{{ leave.days }}</span>
            </p>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface CompanyLeaveAnnualBirthday {
  type: 'annual' | 'birthday'
  available: number
  approved: number
  declined: number
  remaining: number
}

interface CompanyLeaveCounter {
  type: 'sick' | 'medical'
  days: number
}

type CompanyLeave = Array<
  | CompanyLeaveAnnualBirthday
  | CompanyLeaveCounter
>

const props = defineProps<{ companyLeave: CompanyLeave }>()

const title: string = 'Company Leave Amounts'

const annualBirthday = computed<CompanyLeaveAnnualBirthday[]>(() =>
  props.companyLeave.filter((l): l is CompanyLeaveAnnualBirthday => l.type === 'annual' || l.type === 'birthday')
)

const sickMedical = computed<CompanyLeaveCounter[]>(() =>
  props.companyLeave.filter((l): l is CompanyLeaveCounter => l.type === 'sick' || l.type === 'medical')
)

function capitalise(text: string): string {
  const capitalFirst: string = text.charAt(0).toUpperCase()
  const noCaseTail: string = text.slice(1)
  return capitalFirst + noCaseTail
}
</script>
