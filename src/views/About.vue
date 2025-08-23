<template>
  <div class="min-h-screen bg-primary-50">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-dark-800 mb-8">About HR Portal</h1>
        <div class="bg-white rounded-lg shadow-lg p-8">
          <p class="text-lg text-dark-600 mb-6">
            Welcome to the HR Portal - your comprehensive solution for managing human resources efficiently and effectively.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-2xl font-semibold text-dark-800 mb-4">Features</h2>
              <ul class="space-y-2 text-dark-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-accent-200 rounded-full mr-3"></span>
                  Leave Management
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-accent-200 rounded-full mr-3"></span>
                  Employee Dashboard
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-accent-200 rounded-full mr-3"></span>
                  Office Details
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-accent-200 rounded-full mr-3"></span>
                  Request Tracking
                </li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-dark-800 mb-4">Technology</h2>
              <ul class="space-y-2 text-dark-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Vue 3 with Composition API
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Pinia State Management
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Tailwind CSS v4
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Vite Build Tool
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
</script>
