import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
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
