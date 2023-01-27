import { Session } from 'next-auth';
import { headers } from 'next/headers';
import AuthContext from './context';

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

if (!NEXTAUTH_URL) {
  throw new Error('NEXT_PUBLIC_NEXTAUTH_URL is not defined in env');
}

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie }
  });
  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function ArticleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get('cookie') ?? '');
  return <AuthContext session={session}>{children}</AuthContext>;
}
