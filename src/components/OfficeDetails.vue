<template>
  <section class="relative w-full h-screen bg-white rounded-lg shadow-lg overflow-hidden">
    <div id="map" class="w-full h-full"></div>
    <div class="absolute inset-0 bg-dark-300 bg-opacity-20 z-[1]"></div>
    <div class="absolute top-1/2 left-[10%] transform -translate-y-1/2 w-fit z-[2] text-primary-100 bg-dark-800 bg-opacity-75 p-6 rounded-lg">
      <div>
        <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
        <p class="mb-2 text-lg">
          <strong class="mr-2">Office:</strong> {{ office.area }}
        </p>
        <p class="text-lg">
          <strong class="mr-2">URL:</strong>
          <a
            :href="office.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent-200 hover:text-accent-100 underline"
          >
            {{ office.url }}
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import { onMounted, ref } from 'vue'

const props = defineProps({
  darkmode: Boolean,
})

const title = ref('Office Details')
const accessToken = ref('pk.eyJ1IjoibWF0dGVhZ3VlIiwiYSI6ImNraDBvOTltNTAzN2YycW9hZTlwODduaDUifQ.65p1BRgXH_7zL5sAti577g')

const mapStyle = ref(props.darkmode
  ? 'ckh3mr3vj026u19ro1xqjxw9y'
  : 'ckh3d7izg2jt019p9s269w8xa'
)

const office = ref({
  area: 'Malvern Hills Science Park',
  url: 'https://textlocal.com/',
})

const location = ref({
  lat: 52.104485,
  long: -2.311467,
})

const createMap = (long, lat) => {
  mapboxgl.accessToken = accessToken.value
  const el = document.createElement('div')
  const map = new mapboxgl.Map({
    container: 'map',
    style: `mapbox://styles/matteague/${mapStyle.value}`,
    center: [long, lat],
    zoom: 15,
  })
  new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(map)
}

onMounted(() => {
  createMap(location.value.long, location.value.lat)
})
</script>

<style scoped>
:deep(.mapboxgl-ctrl-bottom-right) {
  display: none !important;
}
</style>
