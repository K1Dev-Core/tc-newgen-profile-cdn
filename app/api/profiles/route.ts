import { catalogCache, profiles, toProfileResponse } from '@/lib/profiles';

export const runtime = 'nodejs';

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim().toLocaleLowerCase() ?? '';
  const tag = url.searchParams.get('tag')?.trim().toLocaleLowerCase();
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 25, 1), 100);
  const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);

  const filtered = profiles.filter((profile) => {
    const matchesQuery = !query || `${profile.id} ${profile.name} ${profile.description} ${profile.tags.join(' ')}`.toLocaleLowerCase().includes(query);
    const matchesTag = !tag || profile.tags.some((item) => item.toLocaleLowerCase() === tag);
    return matchesQuery && matchesTag;
  });
  const items = filtered.slice(offset, offset + limit).map((profile) => toProfileResponse(profile, request.url));

  return Response.json(
    { data: items, pagination: { total: filtered.length, limit, offset, hasMore: offset + items.length < filtered.length } },
    { headers: { 'Cache-Control': catalogCache, 'Access-Control-Allow-Origin': '*' } },
  );
}
