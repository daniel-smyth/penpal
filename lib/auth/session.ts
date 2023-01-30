import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@pages/api/auth/[...nextauth]';

interface Context {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}

export async function getUser(context?: Context) {
  let session;

  if (context) {
    session = await getServerSession(context.req, context.res, authOptions);
  } else {
    session = await getServerSession(authOptions);
  }

  return session?.user;
}
