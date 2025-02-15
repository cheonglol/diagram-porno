const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to generate image from Mermaid file
const generateImage = (file) => {
  const output = file.replace(/\.(mmd|mermaid)$/, '.png');
  execSync(`npx mmdc -i ${file} -o ${output}`);
  console.log(`Generated ${output}`);
};

// Find all .mmd and .mermaid files in the repository
const findFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file));
    } else if (file.endsWith('.mmd') || file.endsWith('.mermaid')) {
      results.push(file);
    }
  });
  return results;
};

// Generate images for all found files
const files = findFiles('.');
files.forEach(file => generateImage(file));