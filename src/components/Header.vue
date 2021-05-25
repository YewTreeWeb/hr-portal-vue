<template>
  <header>
    <p>{{ title }}</p>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      title: "Dashboard",
    };
  },
};
</script>

<style lang="scss">
header {
  margin-bottom: 38px;
  > p {
    font-size: _heading(h1);
    line-height: 1;
    font-family: $font-family-header;
    font-weight: $weight-heavy;
  }
}
</style>
