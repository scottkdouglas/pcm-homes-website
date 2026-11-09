import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/images/projects';
const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0);
const files = fs.readdirSync(dir).filter((f) => /^image\d+\.jpe?g$/i.test(f)).sort();

async function encode(input, out, width, maxKB, q = 72) {
  let quality = q;
  for (;;) {
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(out);
    if (fs.statSync(out).size / 1024 <= maxKB || quality <= 40) return quality;
    quality -= 4;
  }
}

const rows = [];
for (const f of files) {
  const base = f.replace(/\.jpe?g$/i, '');
  const src = path.join(dir, f);
  const big = path.join(dir, `${base}.webp`);
  const small = path.join(dir, `${base}-800.webp`);
  const q1 = await encode(src, big, 1920, 250);
  const q2 = await encode(src, small, 800, 90);
  const m = await sharp(big).metadata();
  rows.push({ file: f, jpegKB: +kb(src), webp1920KB: +kb(big), q1920: q1, webp800KB: +kb(small), q800: q2, dims: `${m.width}x${m.height}` });
}

const hero = path.join(dir, 'image00005.jpeg');
await sharp(hero).rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile('public/og-image.jpg');
console.table(rows);
console.log('og-image.jpg', kb('public/og-image.jpg'), 'KB');
