const { execSync } = require('child_process');
const fs = require('fs');

// Function to generate image from Mermaid file
const generateImage = (file) => {
  const output = file.replace(/\.(mmd|mermaid)$/, '.png');
  execSync(`npx mmdc -i ${file} -o ${output}`);
  console.log(`Generated ${output}`);
};

// Find all .mmd and .mermaid files
const files = fs.readdirSync('.').filter(file => file.endsWith('.mmd') || file.endsWith('.mermaid'));

// Generate images for all found files
files.forEach(file => generateImage(file));