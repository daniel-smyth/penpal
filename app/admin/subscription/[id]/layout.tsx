import { useRouter } from 'next/navigation';
import { getUser } from '@lib/auth';
import StripeProvider from './provider';

async function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = await getUser();

  if (!user) {
    router.push('/login');
  }

  return (
    <html>
      <body>
        <StripeProvider>{children}</StripeProvider>
      </body>
    </html>
  );
}

export default SubscriptionLayout;
