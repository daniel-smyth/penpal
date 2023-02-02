import { getUser } from '@lib/auth';
import { useRouter } from 'next/navigation';
import Provider from './provider';

export default async function SubscriptionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = await getUser();

  if (!user) {
    router.push('/login');
  }

  return (
    <html>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
