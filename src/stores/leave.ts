import { defineStore } from 'pinia'

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
    /** Persist current leaveRequests to localStorage */
    persistRequests(): void {
      try {
        localStorage.setItem('formValues', JSON.stringify(this.leaveRequests))
      } catch (e) {
        if (window.console) console.error(e)
      }
    },
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
      this.persistRequests()
      this.updateValues(payload)
    },

    /** Delete a request and persist */
    async deleteRequest(payload: LeaveRequestItem): Promise<void> {
      this.leaveRequests = this.leaveRequests.filter((request) => request.id !== payload.id)
      this.persistRequests()
    },

    /** Update a request field and persist */
    async updateRequest(payload: Partial<LeaveRequestItem> & Pick<LeaveRequestItem, 'id'>): Promise<void> {
      this.leaveRequests.forEach((request: LeaveRequestItem) => {
        if (request.id === payload.id) {
          if (payload.days !== undefined && request.days !== payload.days) {
            request.days = payload.days
          }
          if (payload.status && request.status !== payload.status) {
            request.status = payload.status
          }
          if (import.meta.env.MODE !== 'production' && window.console) {
            console.log(request)
          }
        }
      })
      this.persistRequests()
    },

    /** Check if storage has the key and set local flag */
    async checkStoredKey(): Promise<void> {
      const key = 'formValues'
      const check = localStorage.getItem(key)
      if (check !== null) {
        this.localStorageKey = true
      }
      if (import.meta.env.MODE !== 'production' && window.console) {
        console.log({ hasKey: this.localStorageKey })
      }
    },

    /** Clear storage and reset values for a new year */
    async resetData(): Promise<void> {
      try {
        localStorage.removeItem('formValues')
        this.notification = 'Your company leave has been reset for the start of the new year'
        if (import.meta.env.MODE !== 'production' && window.console) {
          console.log('Database is now empty.')
        }
      } catch (error) {
        if (window.console) console.error(error)
      }
    },

    /** Hydrate store from localStorage when app mounts */
    async hydrateFromStorage(): Promise<void> {
      try {
        const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}`
        let savedRequest: LeaveRequestItem[] | null = null
        if (currentDate !== this.leaveStartDate) {
          const raw = localStorage.getItem('formValues')
          savedRequest = raw ? (JSON.parse(raw) as LeaveRequestItem[]) : []
        } else {
          await this.resetData()
          savedRequest = []
        }
        if (savedRequest) {
          this.leaveRequests = savedRequest
          this.leaveRequests.forEach((request: LeaveRequestItem) => this.updateValues(request))
        }
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : String(e)
        if (window.console) console.error(e)
      }
    },
  },
})
