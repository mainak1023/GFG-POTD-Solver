const fs = require("fs")
const path = require("path")

// Create dist directory if it doesn't exist
if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist")
}

// Create icons directory if it doesn't exist
if (!fs.existsSync("dist/icons")) {
    fs.mkdirSync("dist/icons")
}

// Copy background.js
fs.copyFileSync(path.resolve(__dirname, "src/background.js"), path.resolve(__dirname, "dist/background.js"))
console.log("✓ Copied background.js to dist folder")

// Copy content.js
fs.copyFileSync(path.resolve(__dirname, "src/content.js"), path.resolve(__dirname, "dist/content.js"))
console.log("✓ Copied content.js to dist folder")

// Copy manifest.json
fs.copyFileSync(path.resolve(__dirname, "public/manifest.json"), path.resolve(__dirname, "dist/manifest.json"))
console.log("✓ Copied manifest.json to dist folder")

    // Copy icon files
    ;["icon16.png", "icon48.png", "icon128.png"].forEach((iconFile) => {
        try {
            fs.copyFileSync(
                path.resolve(__dirname, `public/icons/${iconFile}`),
                path.resolve(__dirname, `dist/icons/${iconFile}`),
            )
            console.log(`✓ Copied ${iconFile} to dist/icons folder`)
        } catch (err) {
            console.error(`✗ Error copying ${iconFile}: ${err.message}`)
            console.log("  Please make sure you have the icon files in public/icons/")
        }
    })

console.log("\n✅ Extension files copied successfully!")
console.log("📝 To load the extension in Chrome:")
console.log("  1. Go to chrome://extensions/")
console.log('  2. Enable "Developer mode"')
console.log('  3. Click "Load unpacked" and select the dist folder')

