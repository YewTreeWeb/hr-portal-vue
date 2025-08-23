<template>
  <aside class="text-primary-100 pt-6 px-[2%] pb-16 max-w-[453px] w-full min-h-screen">
    <header class="flex items-center justify-start">
      <img
        src="../assets/Logo.svg"
        alt="An calender icon with the pages turning"
        class="mr-[4%]"
      />
      <h1 class="text-primary-100">{{ title }}</h1>
    </header>
    <Navbar />
  </aside>
</template>

<script setup>
import Navbar from "./Navbar.vue";

defineProps({
  title: String,
})
</script>

<style scoped>
a {
  color: inherit;
}
</style>
