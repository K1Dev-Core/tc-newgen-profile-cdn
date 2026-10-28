import { errorResponse, findProfile } from '@/lib/profiles';

export const runtime = 'nodejs';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const profile = findProfile(id);
  if (!profile) return errorResponse('PROFILE_NOT_FOUND', `No profile exists with id "${id}".`, 404);

  return new Response(null, {
    status: 307,
    headers: {
      Location: new URL(profile.image, request.url).toString(),
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
