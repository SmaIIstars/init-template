import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~@": resolve("../../"),
      "@": resolve(__dirname, "src"),
      pages: resolve("@/pages"),
      components: resolve("@/components"),
      routes: resolve("@/routes"),
      service: resolve("@/service"),
      utils: resolve("@/utils"),
      store: resolve("@/store"),
    },
  },
});
