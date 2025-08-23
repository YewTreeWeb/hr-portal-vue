<template>
  <div
    id="map"
    class="relative w-full h-80 lg:h-96 min-w-[884px] rounded-[20px] border border-accent-600 dark:border-accent-200 bg-accent-200 overflow-hidden"
  >
    <div class="absolute inset-0 bg-accent-200 opacity-50 z-[1]"></div>
    <div class="relative left-0 z-[2] pt-12 px-10">
      <div class="container">
        <h1 class="text-4xl font-header font-bold text-primary-100 mb-4">Hello {{ name }}!</h1>
        <p class="text-xl leading-relaxed text-primary-100 mb-2">
          <strong class="mr-1.5">Office:</strong>{{ office.area }}
        </p>
        <p class="text-xl leading-relaxed text-primary-100 mb-2">
          <strong class="mr-1.5">Company:</strong>
          <a
            :href="office.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-100 hover:text-accent-100 transition-colors"
          >
            {{ company }}
          </a>
        </p>
        <p class="text-xl leading-relaxed text-primary-100 mb-2">
          <strong class="mr-1.5">Role:</strong>{{ role }}
        </p>
        <p class="text-xl leading-relaxed text-primary-100">
          <strong class="mr-1.5">Hired:</strong>{{ hired }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import { onMounted, ref } from 'vue'

const name = ref('Mathew Teague')
const role = ref('UI Developer')
const hired = ref('6th July 2020')
const company = ref('Textlocal')
const accessToken = ref('pk.eyJ1IjoibWF0dGVhZ3VlIiwiYSI6ImNraDBvOTltNTAzN2YycW9hZTlwODduaDUifQ.65p1BRgXH_7zL5sAti577g')

const office = ref({
  area: 'Malvern Hills Science Park',
  url: 'https://textlocal.com/',
})

const location = ref({
  lat: 52.104485,
  long: -2.311467,
})

// Note: darkmode detection would need to be implemented with a composable or store
const mapStyle = ref('ckh3d7izg2jt019p9s269w8xa') // Default to light mode

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
/* Hide Mapbox attribution */
:deep(.mapboxgl-ctrl-bottom-right) {
  display: none !important;
}
</style>
