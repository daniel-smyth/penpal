import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

interface Context {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}

export async function getServerSession(context?: Context) {
  if (context) {
    return await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
  }
  return await unstable_getServerSession(authOptions);
}

export async function getUser(context?: Context) {
  const session = await getServerSession(context);
  return session?.user;
}
