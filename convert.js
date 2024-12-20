import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

async function convertSVGToWebP(svgPath, webpPath) {
  const svgString = fs.readFileSync(svgPath, 'utf8');
  const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
  
  const canvas = createCanvas(800, 500);
  const ctx = canvas.getContext('2d');
  
  const img = await loadImage(svgDataUrl);
  ctx.drawImage(img, 0, 0);
  
  const buffer = canvas.toBuffer('image/webp');
  fs.writeFileSync(webpPath, buffer);
}

async function main() {
  const [,, inputPath, outputPath] = process.argv;
  
  if (!inputPath || !outputPath) {
    console.error('Usage: node convert.js <input.svg> <output.webp>');
    process.exit(1);
  }

  await convertSVGToWebP(inputPath, outputPath);
}

main().catch(console.error);