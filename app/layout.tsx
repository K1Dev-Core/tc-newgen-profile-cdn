import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ทีซี นิวเจน Profile Image API',
  description: 'Read-only profile image catalog and CDN endpoints.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body style={{ fontFamily: 'system-ui, sans-serif', margin: '40px auto', maxWidth: 820, padding: '0 24px', lineHeight: 1.6, color: '#343452' }}>{children}</body></html>;
}
