import { useRouter } from 'next/navigation';
import { getUser } from '@lib/auth';

async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = await getUser();

  if (!user) {
    router.push('/login');
  }

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export default SettingsLayout;
