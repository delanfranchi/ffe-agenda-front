import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    lib: {
      entry: "src/chess-agenda.ts",
      formats: ["es"],
      fileName: "chess-agenda",
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  server: {
    port: 3013,
    cors: true,
  },
  resolve: {
    alias: {
      "@tailwind": fileURLToPath(
        new URL("./src/css/tailwind.ts", import.meta.url)
      ),
    },
  },
  plugins: [tailwindcss()],
});
