import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import fs from "fs"

// Define entry files
const mainPath = resolve(__dirname, "index.html")
const backgroundPath = resolve(__dirname, "public/background.js")
const contentPath = resolve(__dirname, "public/content.js")

// Check if files exist
const backgroundExists = fs.existsSync(backgroundPath)
const contentExists = fs.existsSync(contentPath)

// Define inputs
const inputs = {
  main: mainPath,
}

// Only add background.js if it exists
if (backgroundExists) {
  inputs.background = backgroundPath
}

// Only add content.js if it exists
if (contentExists) {
  inputs.content = contentPath
}

console.log("Build inputs:", inputs)

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
