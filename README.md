# ทีซี นิวเจน Profile Image CDN

Read-only profile catalog and image API. Profile images live in this Git repository under `public/profiles/`; Vercel deploys and serves those static files through its CDN. The API does not upload or modify files.

## Run locally

```bash
npm install
npm run dev
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/profiles` | List profiles; accepts `q`, `tag`, `limit`, `offset` |
| GET | `/api/profiles/{id}` | Get profile metadata and direct image URL |
| GET | `/api/profiles/{id}/image` | Redirect to the static image |
| GET | `/api/profiles/random` | Random profile; accepts `tag` and comma-separated `exclude` IDs |
| GET | `/api/health` | Health and profile count |

Examples:

```bash
curl http://localhost:3000/api/profiles
curl 'http://localhost:3000/api/profiles?tag=friend&limit=10'
curl http://localhost:3000/api/profiles/mew
curl -L http://localhost:3000/api/profiles/mew/image
curl 'http://localhost:3000/api/profiles/random?tag=friend&exclude=mew'
```

## Add or remove an image

1. Add an image such as `public/profiles/mew.webp` (PNG, JPEG, WebP, GIF, and AVIF are supported).
2. Add one entry to `config/profiles.js`:

```js
{
  id: 'mew',
  name: 'Mew',
  description: 'A short description shown in profile pickers.',
  image: '/profiles/mew.webp',
  alt: 'Mew profile picture',
  tags: ['friend'],
}
```

3. Run `npm run validate:profiles`, commit both the image and config, then push. Remove an image by removing its config entry and file, then push.

Keep IDs stable and use a new filename when replacing an image so CDN caches cannot serve an older version. API list/detail responses use short shared-cache lifetimes; random results are not cached. Static images are cached at the Vercel edge for one day with stale-while-revalidate.

## Deploy on Vercel

Import the GitHub repository in Vercel and use the default Next.js build settings. `npm run build` validates the profile catalog before building. When images arrive, add them to `public/profiles/` and update `config/profiles.js`, then push to redeploy.

There is no database, upload endpoint, or runtime filesystem mutation.
