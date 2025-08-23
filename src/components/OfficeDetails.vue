<template>
  <section class="relative w-full h-screen">
    <div id="map" class="absolute inset-0">
      <!-- Mapbox renders here; controls hidden via mapbox CSS override if needed -->
    </div>
    <div
      class="absolute top-1/2 left-[10%] -translate-y-1/2 w-fit z-[2] text-text"
    >
      <div>
        <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
        <p><strong>Office:</strong> {{ office.area }}</p>
        <p>
          <strong>URL:</strong>
          <a :href="office.url" target="_blank" rel="noopener noreferrer">{{
            office.url
          }}</a>
        </p>
      </div>
    </div>
    <div class="absolute inset-0 z-[1] bg-[color:oklch(0.5_0_0_/0.2)]"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Props { darkmode?: boolean }
const props = defineProps<Props>()

const title: string = 'Office Details'
// Leaflet does not require an access token; using OpenStreetMap tiles

interface OfficeInfo { area: string; url: string }
const office: OfficeInfo = { area: 'Malvern Hills Science Park', url: 'https://textlocal.com/' }

interface LatLng { lat: number; long: number }
const location: LatLng = { lat: 52.104485, long: -2.311467 }

function createMap(long: number, lat: number): void {
  const map = L.map('map', { zoomControl: true }).setView([lat, long], 15)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)
  L.marker([lat, long]).addTo(map)
}

onMounted(() => createMap(location.long, location.lat))
</script>


