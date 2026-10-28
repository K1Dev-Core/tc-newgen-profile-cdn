import profileCatalog from '@/config/profiles.js';

export type Profile = {
  id: string;
  name: string;
  image: string;
  alt: string;
  tags: string[];
};

export type ProfileResponse = Profile & {
  imageUrl: string;
  imageEndpoint: string;
};

export const profiles = profileCatalog as Profile[];

export function toProfileResponse(profile: Profile, requestUrl: string): ProfileResponse {
  const imageUrl = new URL(profile.image, requestUrl).toString();
  return {
    ...profile,
    imageUrl,
    imageEndpoint: new URL(`/api/profiles/${encodeURIComponent(profile.id)}/image`, requestUrl).toString(),
  };
}

export function findProfile(id: string): Profile | undefined {
  return profiles.find((profile) => profile.id === id);
}

export function errorResponse(code: string, message: string, status: number) {
  return Response.json({ error: { code, message } }, { status });
}

export const catalogCache = 'public, s-maxage=300, stale-while-revalidate=3600';
