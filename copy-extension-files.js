import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the files and directories to copy
const filesToCopy = [
    'manifest.json',
    'background.js',
    'content.js',
    'icons/icon48.png',
    // Add other files as needed
];

// Define the source and destination directories
const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');

// Ensure the destination directory exists
fs.ensureDirSync(destDir);

// Copy each file from the source to the destination
filesToCopy.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    // Ensure the destination directory exists (for nested files)
    const destFileDir = path.dirname(destFile);
    fs.ensureDirSync(destFileDir);

    fs.copySync(srcFile, destFile);
    console.log(`Copied ${file} to ${destFile}`);
});
