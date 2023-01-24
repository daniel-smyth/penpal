import NextAuth from 'next-auth';
import { IUser } from '@lib/database/models';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: IUser;
  }
}
