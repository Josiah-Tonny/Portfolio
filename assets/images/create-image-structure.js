/**
 * This script creates placeholder images for the portfolio website
 * Run with: node create-image-structure.js
 */
const fs = require('fs');
const path = require('path');

// List of images to create
const images = [
  'agriculture-bg.jpg',
  'pattern.svg',
  'farmai-project.jpg',
  'data-insights.jpg',
  'ai-implementation.jpg',
  'farmer-training.jpg',
  'community-engagement.jpg',
  'water-conservation.jpg'
];

// Ensure the directory exists
const imageDir = path.join(__dirname);
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Create a simple SVG pattern
const createSvgPattern = () => {
  return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3498db" stroke-width="0.5" opacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#smallGrid)" />
  </svg>`;
};

// Create placeholder images
images.forEach(filename => {
  const filePath = path.join(imageDir, filename);
  
  if (!fs.existsSync(filePath)) {
    if (filename.endsWith('.svg')) {
      fs.writeFileSync(filePath, createSvgPattern());
      console.log(`Created SVG: ${filename}`);
    } else {
      // For this placeholder script, we'd just write a note
      // In a real environment, we would generate actual placeholder images
      console.log(`Image needed: ${filename} - Please add a real image here`);
    }
  }
});

console.log('Image placeholder creation complete');
