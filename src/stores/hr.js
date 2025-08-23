import { openDB } from 'idb'
import localforage from 'localforage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useHrStore = defineStore('hr', () => {
  // State
  const title = ref('HRPortal')
  const leaveStartDate = ref('1-4') // Day and month
  const companyLeave = ref([
    {
      type: 'annual',
      available: 25,
      approved: 0,
      declined: 0,
      remaining: 25,
    },
    {
      type: 'birthday',
      available: 1,
      approved: 0,
      declined: 0,
      remaining: 1,
    },
    {
      type: 'sick',
      days: 0,
    },
    {
      type: 'medical',
      days: 0,
    },
  ])
  const leaveRequests = ref([])
  const localStorageKey = ref(false)
  const error = ref('')
  const notification = ref('')
  const darkmode = ref(false)

  // Getters
  const totalApprovedDays = computed(() => {
    return leaveRequests.value
      .filter(request => request.status === 'approved')
      .reduce((total, request) => total + Number(request.days), 0)
  })

  const totalPendingRequests = computed(() => {
    return leaveRequests.value.filter(request => request.status === 'pending').length
  })

  // Actions
  function updateValues(el) {
    const days = Number(el.days)
    if (el.type === 'annual' || el.type === 'birthday') {
      const leaveType = el.type === 'annual' ? companyLeave.value[0] : companyLeave.value[1]
      if (el.status === 'approved') {
        leaveType.approved = Number(leaveType.approved) + days
        leaveType.remaining = Number.isInteger(leaveType.remaining)
          ? leaveType.remaining - days
          : (leaveType.remaining - days).toFixed(1)
      } else {
        leaveType.declined = Number(leaveType.declined) + days
      }
    } else if (el.type === 'sick') {
      companyLeave.value[2].days = Number(companyLeave.value[2].days) + days
    } else if (el.type === 'medical') {
      companyLeave.value[3].days = Number(companyLeave.value[3].days) + days
    }
  }

  async function formSubmitted(payload) {
    leaveRequests.value.push(payload)
    await localforage.setItem('formValues', leaveRequests.value)
    updateValues(payload)
  }

  async function deleteRequest(payload) {
    leaveRequests.value = leaveRequests.value.filter((request) => {
      return request.id !== payload.id
    })
    await localforage.setItem('formValues', leaveRequests.value)
  }

  async function updateRequest(payload) {
    leaveRequests.value.forEach((request) => {
      if (request.id === payload.id) {
        if (request.days !== payload.days && payload.days !== '') {
          request.days = payload.days
        } else if (request.status !== payload.status && payload.status !== '') {
          request.status = payload.status
        }
        if (import.meta.env.DEV && window.console) {
          console.log(request)
        }
      }
    })
    await localforage.setItem('formValues', leaveRequests.value)
  }

  async function checkStoredKey() {
    const storeName = 'keyvaluepairs'
    const key = 'formValues'
    const db = await openDB('localforage')
    if (db.objectStoreNames.contains(storeName)) {
      const tx = db.transaction(storeName)
      const store = tx.objectStore(storeName)
      const checkKey = await store.get(key)

      if (checkKey !== undefined) {
        localStorageKey.value = !localStorageKey.value
      }

      if (import.meta.env.DEV && window.console) {
        console.log(db.objectStoreNames)
        console.log({ checkKey })
        console.log('localkey is', localStorageKey.value)
      }
    }
  }

  async function resetData() {
    try {
      await localforage.clear()
      notification.value = 'Your company leave has been reset for the start of the new year'
      if (import.meta.env.DEV && window.console) {
        console.log('Database is now empty.')
      }
    } catch (err) {
      if (window.console) {
        console.error(err)
      }
    }
  }

  async function initializeData() {
    try {
      await checkStoredKey()
      if (typeof localStorage !== 'undefined' && localStorageKey.value) {
        const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}`
        let savedRequest

        if (currentDate !== leaveStartDate.value) {
          savedRequest = await localforage.getItem('formValues')
          if (savedRequest === null) {
            throw new Error("Can't get saved form values.")
          }
        } else {
          await resetData()
          savedRequest = []
        }

        if (savedRequest && savedRequest.length > 0) {
          leaveRequests.value = savedRequest
          leaveRequests.value.forEach((request) => {
            updateValues(request)
          })
        }

        if (import.meta.env.DEV && window.console) {
          console.log('localforage is initialized')
        }
      }
    } catch (err) {
      error.value = err.message
      if (window.console) {
        console.error(err)
      }
    }
  }

  function toggleDarkMode() {
    darkmode.value = !darkmode.value
    document.documentElement.classList.toggle('dark', darkmode.value)
  }

  return {
    // State
    title,
    leaveStartDate,
    companyLeave,
    leaveRequests,
    localStorageKey,
    error,
    notification,
    darkmode,
    // Getters
    totalApprovedDays,
    totalPendingRequests,
    // Actions
    updateValues,
    formSubmitted,
    deleteRequest,
    updateRequest,
    checkStoredKey,
    resetData,
    initializeData,
    toggleDarkMode
  }
})
