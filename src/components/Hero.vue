<template>
  <section class="hero is-large">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle" v-if="subtitle">{{ subtitle }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
  props: {
    title: String,
    subtitle: String
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
