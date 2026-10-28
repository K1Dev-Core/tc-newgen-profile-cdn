import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const configPath = resolve('config/profiles.js');
const source = readFileSync(configPath, 'utf8');
const ids = [...source.matchAll(/\bid:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const images = [...source.matchAll(/\bimage:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);

if (new Set(ids).size !== ids.length) throw new Error('Duplicate profile IDs found in config/profiles.js');
if (ids.some((id) => !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(id))) throw new Error('Profile IDs must use lowercase letters, numbers, hyphens, or underscores.');
if (ids.length !== images.length) throw new Error('Every profile must have exactly one image path.');

for (const image of images) {
  if (!image.startsWith('/profiles/') || image.includes('..') || image.includes('\\')) {
    throw new Error(`Invalid profile image path: ${image}`);
  }
  if (!/\.(png|jpe?g|webp|gif|avif)$/i.test(image)) throw new Error(`Unsupported profile image type: ${image}`);
  const filePath = resolve('public', `.${image}`);
  if (!filePath.startsWith(`${resolve('public')}${sep}`) || !existsSync(filePath)) {
    throw new Error(`Profile image file does not exist: public${image}`);
  }
}

console.log(`Validated ${ids.length} profile(s).`);
