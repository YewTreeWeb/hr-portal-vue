<template>
  <div
    class="relative w-full h-[318px] md:h-[388px] rounded-[20px] border border-accent-dark dark:border-accent bg-accent overflow-hidden"
  >
    <div id="map" class="absolute inset-0 z-0"></div>
    <div
      class="absolute inset-0 bg-accent opacity-85 z-10 pointer-events-none"
    ></div>
    <div class="relative left-0 z-20 p-[47px] px-[38px]">
      <div class="container">
        <h1 class="text-[clamp(30px,2.5vw,48px)] font-bold">
          Hello {{ name }}!
        </h1>
        <p class="text-[24px] leading-[1.6]">
          <strong class="mr-[6px]">Office:</strong>{{ office.area }}
        </p>
        <p class="text-[24px] leading-[1.6]">
          <strong class="mr-[6px]">Company:</strong>
          <a :href="office.url" target="_blank" rel="noopener noreferrer">{{
            company
          }}</a>
        </p>
        <p class="text-[24px] leading-[1.6]">
          <strong class="mr-[6px]">Role:</strong>{{ role }}
        </p>
        <p class="text-[24px] leading-[1.6]">
          <strong class="mr-[6px]">Hired:</strong>{{ hired }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";

const name: string = "Mathew Teague";
const role: string = "UI Developer";
const hired: string = "6th July 2020";
const company: string = "Textlocal";
// Leaflet does not require an access token for OSM tiles

interface OfficeInfo {
  area: string;
  url: string;
}
const office: OfficeInfo = {
  area: "Malvern Hills Science Park",
  url: "https://textlocal.com/",
};

interface LatLng {
  lat: number;
  long: number;
}
const location: LatLng = { lat: 52.104485, long: -2.311467 };

function createMap(long: number, lat: number): void {
  const map = L.map("map", { zoomControl: true }).setView([lat, long], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);
  L.marker([lat, long]).addTo(map);
}

onMounted(() => {
  createMap(location.long, location.lat);
});
</script>
