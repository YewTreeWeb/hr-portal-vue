<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h2>{{ title }}</h2>
          <p>Office: {{ this.office }}</p>
          <p>
            URL:
            <a :href="this.url" target="_blank" rel="noopener noreferrer">{{
              this.url
            }}</a>
          </p>
          <p>Coordinates: {{ this.location[0] }}, {{ this.location[1] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OfficeDetails",
  props: {
    office: String,
    url: String,
    location: Array
  },
  data() {
    return {
      title: "Office Details"
    };
  }
};
</script>
