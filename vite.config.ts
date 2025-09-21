import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import postcssLit from "rollup-plugin-postcss-lit";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "chess-agenda",
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  server: {
    port: 3015,
    cors: true,
  },
  resolve: {
    alias: {
      "@tailwind": fileURLToPath(
        new URL("./src/css/tailwind.ts", import.meta.url)
      ),
    },
  },
  plugins: [
    postcssLit({
      include: ["/src/**/*.css", "/src/**/*.css?*"],
    }),
  ],
});
