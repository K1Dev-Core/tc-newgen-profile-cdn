const endpoints = [
  ['GET', '/api/profiles', 'List profiles. Supports q, tag, limit, offset.'],
  ['GET', '/api/profiles/{id}', 'Get one profile and its image URLs.'],
  ['GET', '/api/profiles/{id}/image', 'Redirect to the CDN-served image file.'],
  ['GET', '/api/profiles/random', 'Get a random profile. Supports tag and exclude.'],
  ['GET', '/api/health', 'Check API status.'],
];

export default function Home() {
  return <main>
    <p style={{ color: '#6967a8', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: 12 }}>ทีซี นิวเจน · API</p>
    <h1 style={{ marginBottom: 8 }}>Profile Image CDN</h1>
    <p style={{ color: '#62617f', marginTop: 0 }}>Read-only profile image API. Images are committed in this repository and served from the Vercel CDN.</p>
    <h2 style={{ marginTop: 32 }}>Endpoints</h2>
    <ul style={{ listStyle: 'none', padding: 0, borderTop: '1px solid #deddeb' }}>{endpoints.map(([method, path, description]) => <li key={path} style={{ padding: '13px 0', borderBottom: '1px solid #deddeb' }}><code style={{ color: '#6967a8', fontWeight: 700, marginRight: 12 }}>{method}</code><code style={{ color: '#343452' }}>{path}</code><div style={{ color: '#6e6e8b', fontSize: 14, marginTop: 4 }}>{description}</div></li>)}</ul>
    <p>Profile count: <a href="/api/profiles">view catalog</a></p>
  </main>;
}
