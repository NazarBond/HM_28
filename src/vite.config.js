import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/HM_28/", // Обов'язково для коректного завантаження ресурсів на GitHub Pages
});
