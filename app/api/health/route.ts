import { profiles } from '@/lib/profiles';

export function GET() {
  return Response.json({ status: 'ok', service: 'tc-newgen-profile-cdn', profileCount: profiles.length });
}
