<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle" v-if="subtitle">{{ subtitle }}</h2>
        <p v-if="notice" :class="{ show: notify }">{{ showNotify() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    title: String,
    subtitle: String,
    notice: String
  },
  data() {
    return {
      notify: this.notice ? this.notice : ""
    };
  },
  methods: {
    showNotify() {
      const currentDate = `${new Date().getDate()}-${new Date().getMonth() +
        1}`;
      if (currentDate === "1-4") {
        setTimeout(() => {
          this.notify = "";
        }, 8000);
      }
    }
  }
};
</script>

<style lang="scss">
.hero {
  background-color: v(colour-accent);
}
</style>
