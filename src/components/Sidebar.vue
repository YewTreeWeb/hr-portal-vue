<template>
  <aside
    class="text-white pt-[25.4px] px-[2%] pb-[60px] max-w-[453px] w-full min-h-screen"
  >
    <header class="flex items-center justify-start">
      <img
        src="../assets/Logo.svg"
        alt="An calender icon with the pages turning"
        class="mr-[4%]"
      />
      <h1>{{ title }}</h1>
    </header>
    <Navbar />
  </aside>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";

interface SidebarProps {
  title?: string;
}
const { title = "HRPortal" } = defineProps<SidebarProps>();
</script>
