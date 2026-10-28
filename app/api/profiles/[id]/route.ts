import { errorResponse, findProfile, toProfileResponse } from '@/lib/profiles';

export const runtime = 'nodejs';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const profile = findProfile(id);
  if (!profile) return errorResponse('PROFILE_NOT_FOUND', `No profile exists with id "${id}".`, 404);

  return Response.json({ data: toProfileResponse(profile, request.url) }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } });
}
