import { errorResponse, profiles, toProfileResponse } from '@/lib/profiles';

export const runtime = 'nodejs';

export function GET(request: Request) {
  const url = new URL(request.url);
  const tag = url.searchParams.get('tag')?.trim().toLocaleLowerCase();
  const excluded = new Set((url.searchParams.get('exclude') ?? '').split(',').map((id) => id.trim()).filter(Boolean));
  const candidates = profiles.filter((profile) =>
    !excluded.has(profile.id) && (!tag || profile.tags.some((item) => item.toLocaleLowerCase() === tag)),
  );

  if (candidates.length === 0) {
    return errorResponse('NO_PROFILES_AVAILABLE', 'No profile images match the requested filters.', 404);
  }

  const profile = candidates[Math.floor(Math.random() * candidates.length)];
  return Response.json({ data: toProfileResponse(profile, request.url) }, { headers: { 'Cache-Control': 'no-store' } });
}
