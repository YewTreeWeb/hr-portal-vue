<template>
  <nav class="mt-[43px] w-full pl-[12%]">
    <ul class="space-y-[37px]">
      <li v-for="(item, index) in items" :key="index" class="last:mb-0">
        <a
          v-if="item.type === 'external'"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ item.text }}</a
        >
        <a v-else :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface NavItem {
  link: string;
  text: string;
  type?: "external";
}
const items = ref<NavItem[]>([
  { link: "#top", text: "Dashboard" },
  { link: "/book-leave", text: "Book Leave" },
  { link: "/leave-log", text: "Leave Log & Balance" },
]);
</script>
