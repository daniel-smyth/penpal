import NextAuth from 'next-auth';
import { IUser } from '@lib/database/models';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }
}
