import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Vite config in ESM (.mts) so ESM-only plugins like @tailwindcss/vite load correctly.
export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
