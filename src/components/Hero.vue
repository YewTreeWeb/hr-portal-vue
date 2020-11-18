<template>
  <div id="map" class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Hello {{ this.title }}!</h1>
        <h2 class="subtitle" v-if="this.subtitle">{{ this.subtitle }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "Hero",
  props: {
    title: String,
    subtitle: String,
    darkmode: Boolean
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoibWF0dGVhZ3VlIiwiYSI6ImNraDBvOTltNTAzN2YycW9hZTlwODduaDUifQ.65p1BRgXH_7zL5sAti577g",
      mapStyle: this.darkmode
        ? "ckh3mr3vj026u19ro1xqjxw9y"
        : "ckh3d7izg2jt019p9s269w8xa",
      office: {
        area: "Malvern Hills Science Park",
        url: "https://textlocal.com/"
      },
      location: {
        lat: 52.104485,
        long: -2.311467
      }
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
        zoom: 15
      });
      new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(map);
    },
    showNotify() {
      const currentDate = `${new Date().getDate()}-${new Date().getMonth() +
        1}`;
      if (currentDate === "1-4") {
        setTimeout(() => {
          this.notify = "";
        }, 8000);
      }
    }
  },
  mounted() {
    this.createMap(this.location.long, this.location.lat);
  }
};
</script>

<style lang="scss">
.hero {
  position: relative;
  @include size(100%);
  max-height: 318px;
  border-radius: 20px;
  border: 1px solid v(colour-accent-dark);
  @include darkmode {
    border: 1px solid v(colour-accent);
  }
  background-color: v(colour-accent);
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    @include size(100%);
    background-color: v(colour-accent);
    opacity: 0.5;
    z-index: 1;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none !important;
  }
  .hero-body {
    @include center(false);
    left: 0;
    z-index: 2;
  }
}
</style>
