<template>
  <div
    class="relative w-full h-[318px] md:h-[388px] rounded-[20px] border border-accent-dark dark:border-accent bg-accent overflow-hidden"
  >
    <div id="map" class="absolute inset-0"></div>
    <div class="absolute inset-0 bg-accent opacity-50 z-[1]"></div>
    <div class="relative left-0 z-[2] p-[47px] px-[38px]">
      <div class="container">
        <h1 class="text-[48px] font-bold">Hello {{ name }}!</h1>
        <p class="text-[24px] leading-[1.6]"><strong class="mr-[6px]">Office:</strong>{{ office.area }}</p>
        <p class="text-[24px] leading-[1.6]">
          <strong class="mr-[6px]">Company:</strong>
          <a :href="office.url" target="_blank" rel="noopener noreferrer">{{ company }}</a>
        </p>
        <p class="text-[24px] leading-[1.6]"><strong class="mr-[6px]">Role:</strong>{{ role }}</p>
        <p class="text-[24px] leading-[1.6]"><strong class="mr-[6px]">Hired:</strong>{{ hired }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const name: string = 'Mathew Teague'
const role: string = 'UI Developer'
const hired: string = '6th July 2020'
const company: string = 'Textlocal'
const accessToken: string = (import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string) || ''

// If you later wire dark mode from store/prop, pick style accordingly.
const darkmode: boolean = false
const mapStyle: string = darkmode ? 'ckh3mr3vj026u19ro1xqjxw9y' : 'ckh3d7izg2jt019p9s269w8xa'

interface OfficeInfo { area: string; url: string }
const office: OfficeInfo = { area: 'Malvern Hills Science Park', url: 'https://textlocal.com/' }

interface LatLng { lat: number; long: number }
const location: LatLng = { lat: 52.104485, long: -2.311467 }

function createMap(long: number, lat: number): void {
  mapboxgl.accessToken = accessToken
  const el: HTMLDivElement = document.createElement('div')
  const map = new mapboxgl.Map({
    container: 'map',
    style: `mapbox://styles/matteague/${mapStyle}`,
    center: [long, lat],
    zoom: 15,
  })
  new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(map)
}

function showNotify(): void {
  const currentDate: string = `${new Date().getDate()}-${new Date().getMonth() + 1}`
  if (currentDate === '1-4') {
    setTimeout(() => {
      // no-op placeholder for prior notify behaviour
    }, 8000)
  }
}

onMounted(() => {
  createMap(location.long, location.lat)
})
</script>


