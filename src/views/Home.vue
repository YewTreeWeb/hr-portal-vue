<template>
  <div class="min-h-screen bg-primary-50">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <Hero />
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div class="lg:col-span-1">
          <Sidebar />
        </div>
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Leave />
            <LeaveRequest />
            <LeaveLog />
            <OfficeDetails />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import Leave from '@/components/Leave.vue'
import LeaveLog from '@/components/LeaveLog.vue'
import LeaveRequest from '@/components/LeaveRequest.vue'
import OfficeDetails from '@/components/OfficeDetails.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>
