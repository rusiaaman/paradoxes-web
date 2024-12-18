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
  await convertSVGToWebP(
    './public/assets/monty-hall-preview.svg',
    './public/assets/monty-hall-preview.webp'
  );
  await convertSVGToWebP(
    './public/assets/sleeping-beauty-preview.svg',
    './public/assets/sleeping-beauty-preview.webp'
  );
}

main().catch(console.error);