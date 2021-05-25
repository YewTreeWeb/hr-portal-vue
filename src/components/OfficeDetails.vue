<template>
  <section class="officeDetails">
    <div id="map" class="officeDetails__map"></div>
    <div class="officeDetails__info">
      <div class="columns">
        <div class="column">
          <h2>{{ title }}</h2>
          <p><strong>Office:</strong> {{ office.area }}</p>
          <p>
            <strong>URL:</strong>
            <a :href="office.url" target="_blank" rel="noopener noreferrer">{{
              office.url
            }}</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "OfficeDetails",
  props: {
    darkmode: Boolean,
  },
  data() {
    return {
      title: "Office Details",
      accessToken:
        "pk.eyJ1IjoibWF0dGVhZ3VlIiwiYSI6ImNraDBvOTltNTAzN2YycW9hZTlwODduaDUifQ.65p1BRgXH_7zL5sAti577g",
      mapStyle: this.darkmode
        ? "ckh3mr3vj026u19ro1xqjxw9y"
        : "ckh3d7izg2jt019p9s269w8xa",
      office: {
        area: "Malvern Hills Science Park",
        url: "https://textlocal.com/",
      },
      location: {
        lat: 52.104485,
        long: -2.311467,
      },
    };
  },
  methods: {
    createMap(long, lat) {
      mapboxgl.accessToken = this.accessToken;
      let el = document.createElement("div");
      const map = new mapboxgl.Map({
        container: "map",
        style: `mapbox://styles/matteague/${this.mapStyle}`,
        center: [long, lat],
        zoom: 15,
      });
      new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(map);
    },
  },
  mounted() {
    this.createMap(this.location.long, this.location.lat);
  },
};
</script>

<style lang="scss">
.officeDetails {
  position: relative;
  @include size(100%, 100vh);
  &::after {
    @include size(100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    content: "";
    background-color: hex2hsla(get-color(dark, 3), 20%);
  }
  &__map {
    @include size(100%);
    .mapboxgl-ctrl-bottom-right {
      display: none !important;
    }
  }
  &__info {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    width: fit-content;
    z-index: 2;
    color: v(colour-text);
  }
}
</style>
