import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import fs from "fs"

// Check if the entry files exist
const backgroundPath = resolve(__dirname, "src/background.js")
const contentPath = resolve(__dirname, "src/content.js")
const mainPath = resolve(__dirname, "index.html")

const inputs = {
  main: mainPath,
}

// Only add background.js if it exists
if (fs.existsSync(backgroundPath)) {
  inputs.background = backgroundPath
}

// Only add content.js if it exists
if (fs.existsSync(contentPath)) {
  inputs.content = contentPath
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: inputs,
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "background" || chunkInfo.name === "content"
            ? "[name].js"
            : "assets/[name]-[hash].js"
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
})

