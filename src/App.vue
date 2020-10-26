<template>
  <div id="app">
    <Hero :title="heading" :subtitle="`${name} - ${role} at ${company}`" />
    <Leave />
  </div>
</template>

<script>
import Hero from "./components/Hero";
import Leave from "./components/Leave";

export default {
  name: "App",
  data() {
    return {
      heading: "HR Portal",
      name: "Mathew Teague",
      role: "UI Developer",
      hired: "6th July 2020",
      department: "Development",
      company: "Textlocal",
      office: {
        area: "Malvern",
        link: "#"
      },
      location: {
        lat: 37.7749,
        lng: -122.4194
      }
    };
  },
  components: {
    Hero,
    Leave
  }
};
</script>

<style lang="scss">
#app {
  font-family: quote(Barlow), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  @include padding(null null 30px);
  min-height: 100vh;
}
</style>
