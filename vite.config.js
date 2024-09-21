import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    exclude: [
      "node_modules/**",
      "./test-e2e/**",
    ],
    testTimeout: 5000,
    reporters: ["verbose"]
  }
})
