import { defineStore } from 'pinia'
import localforage from 'localforage'
import { openDB } from 'idb'

export type LeaveType = 'annual' | 'birthday' | 'sick' | 'medical'

export interface LeaveRequestItem {
  id: string
  type: LeaveType
  days: number
  status: 'approved' | 'declined' | 'pending'
}

export interface CompanyLeaveAnnualBirthday {
  type: 'annual' | 'birthday'
  available: number
  approved: number
  declined: number
  remaining: number
}

export interface CompanyLeaveCounter {
  type: 'sick' | 'medical'
  days: number
}

export type CompanyLeave = [CompanyLeaveAnnualBirthday, CompanyLeaveAnnualBirthday, CompanyLeaveCounter, CompanyLeaveCounter]

export interface LeaveState {
  title: string
  leaveStartDate: string
  companyLeave: CompanyLeave
  leaveRequests: LeaveRequestItem[]
  localStorageKey: boolean
  error: string
  notification: string
  darkmode: boolean
}

/**
 * Pinia store mirroring the previous App.vue state and methods.
 */
export const useLeaveStore = defineStore('leave', {
  state: (): LeaveState => ({
    title: 'HRPortal',
    leaveStartDate: '1-4',
    companyLeave: [
      { type: 'annual', available: 25, approved: 0, declined: 0, remaining: 25 },
      { type: 'birthday', available: 1, approved: 0, declined: 0, remaining: 1 },
      { type: 'sick', days: 0 },
      { type: 'medical', days: 0 },
    ],
    leaveRequests: [],
    localStorageKey: false,
    error: '',
    notification: '',
    darkmode: true,
  }),
  actions: {
    /** Update company leave counters based on a request */
    updateValues(el: LeaveRequestItem): void {
      const days: number = Number(el.days)
      if (el.type === 'annual' || el.type === 'birthday') {
        const leaveType = el.type === 'annual' ? this.companyLeave[0] : this.companyLeave[1]
        if (el.status === 'approved') {
          leaveType.approved = Number(leaveType.approved) + days
          leaveType.remaining = Number.isInteger(leaveType.remaining)
            ? (leaveType.remaining as number) - days
            : Number(((leaveType.remaining as number) - days).toFixed(1))
        } else {
          leaveType.declined = Number(leaveType.declined) + days
        }
      } else if (el.type === 'sick') {
        this.companyLeave[2].days = Number(this.companyLeave[2].days) + days
      } else if (el.type === 'medical') {
        this.companyLeave[3].days = Number(this.companyLeave[3].days) + days
      }
    },

    /** Add a new request and persist */
    async formSubmitted(payload: LeaveRequestItem): Promise<void> {
      this.leaveRequests.push(payload)
      await localforage.setItem('formValues', this.leaveRequests)
      this.updateValues(payload)
    },

    /** Delete a request and persist */
    async deleteRequest(payload: LeaveRequestItem): Promise<void> {
      this.leaveRequests = this.leaveRequests.filter((request) => request.id !== payload.id)
      await localforage.setItem('formValues', this.leaveRequests)
    },

    /** Update a request field and persist */
    async updateRequest(payload: Partial<LeaveRequestItem> & Pick<LeaveRequestItem, 'id'>): Promise<void> {
      this.leaveRequests.forEach((request) => {
        if (request.id === payload.id) {
          if (payload.days !== undefined && request.days !== payload.days) {
            request.days = payload.days
          }
          if (payload.status && request.status !== payload.status) {
            request.status = payload.status
          }
          if (process.env.NODE_ENV !== 'production' && window.console) {
            console.log(request)
          }
        }
      })
      await localforage.setItem('formValues', this.leaveRequests)
    },

    /** Check if localforage has the key and set local flag */
    async checkStoredKey(): Promise<void> {
      const storeName = 'keyvaluepairs'
      const key = 'formValues'
      const db = await openDB('localforage')
      if (db.objectStoreNames.contains(storeName)) {
        const tx = db.transaction(storeName)
        const store = await tx.objectStore(storeName)
        const checkKey = await store.get(key)
        if (checkKey !== undefined) {
          this.localStorageKey = !this.localStorageKey
        }
        if (process.env.NODE_ENV !== 'production' && window.console) {
          console.log(db.objectStoreNames)
          console.log({ checkKey })
          console.log('localkey is', this.localStorageKey)
        }
      }
    },

    /** Clear storage and reset values for a new year */
    async resetData(): Promise<void> {
      try {
        await localforage.clear()
        this.notification = 'Your company leave has been reset for the start of the new year'
        if (process.env.NODE_ENV !== 'production' && window.console) {
          console.log('Database is now empty.')
        }
      } catch (error) {
        if (window.console) console.error(error)
      }
    },

    /** Hydrate store from localforage when app mounts */
    async hydrateFromLocalforage(): Promise<void> {
      try {
        const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}`
        let savedRequest: LeaveRequestItem[] | null = null
        if (currentDate !== this.leaveStartDate) {
          savedRequest = (await localforage.getItem('formValues')) as LeaveRequestItem[] | null
          if (savedRequest === null) throw new Error("Can't get saved form values.")
        } else {
          await this.resetData()
          savedRequest = []
        }
        if (savedRequest) {
          this.leaveRequests = savedRequest
          this.leaveRequests.forEach((request) => this.updateValues(request))
        }
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : String(e)
        if (window.console) console.error(e)
      }
    },
  },
})
