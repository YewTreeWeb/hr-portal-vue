<template>
  <div id="app" class="min-h-screen text-current antialiased flex items-start bg-grey-dark dark:bg-black">
    <Sidebar :title="store.title" />
    <main class="bg-primary rounded-[40px_0_0_40px] p-10 w-full min-h-screen">
      <Header />
      <section class="container mx-auto px-4">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div class="md:col-span-9">
            <Hero />
            <LeaveLog
              :leaveRequests="store.leaveRequests"
              :error="store.error"
              @delete="store.deleteRequest"
              @update="store.updateRequest"
            />
          </div>
          <div class="md:col-span-3 md:pl-[30px]">
            <LeaveRequest @submittedValues="store.formSubmitted" />
          </div>
        </div>
      </section>
      <section class="container mx-auto px-4 mt-[38px]">
        <Leave :companyLeave="store.companyLeave" />
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useLeaveStore } from './stores/leave'
import Hero from './components/Hero'
import Leave from './components/Leave'
import LeaveLog from './components/LeaveLog'
import LeaveRequest from './components/LeaveRequest'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const store = useLeaveStore()

onMounted(async () => {
  await store.checkStoredKey()
  if (typeof localStorage !== 'undefined' && store.localStorageKey) {
    await store.hydrateFromLocalforage()
  }
})
</script>

