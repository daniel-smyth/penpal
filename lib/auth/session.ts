import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...auth]';

export async function getSession(context?: GetServerSidePropsContext) {
  if (context) {
    return await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
  }
  return await unstable_getServerSession(authOptions);
}

export async function getUser() {
  const session = await getSession();
  return session?.user;
}
