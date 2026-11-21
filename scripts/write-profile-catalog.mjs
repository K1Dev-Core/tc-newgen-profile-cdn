import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import profiles from '../config/profiles.js';

const baseUrl = 'https://profile-image-cdn.vercel.app';
const data = profiles.map((profile) => ({
  ...profile,
  imageUrl: new URL(profile.image, baseUrl).toString(),
  imageEndpoint: new URL(`/api/profiles/${encodeURIComponent(profile.id)}/image`, baseUrl).toString(),
}));
const outputDirectory = resolve('public/profiles');
await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, 'catalog.json'), JSON.stringify({
  data,
  pagination: { total: data.length, limit: data.length, offset: 0, hasMore: false },
}));
console.log(`Wrote static catalog for ${data.length} profile(s).`);
