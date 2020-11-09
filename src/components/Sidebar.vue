<template>
  <aside class="sidebar">
    <header>
      <img
        src="../assets/Logo.svg"
        alt="An calender icon with the pages turning"
      />
      <h1>{{ title }}</h1>
    </header>
    <Navbar />
  </aside>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "Sidebar",
  props: {
    title: String
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
.sidebar {
  color: v(colour-white);
  @include padding(25.4px 2% 60px);
  max-width: 453px;
  width: 100%;
  a {
    color: inherit;
  }
  header {
    @include flex(center, flex-start, row);
    img {
      margin-right: 4%;
    }
  }
}
</style>
