'use client';

import { SessionProvider } from 'next-auth/react';

export default function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// 'use client';

// import React, { FC } from 'react';
// import { SessionProvider, useSession } from 'next-auth/react';

// export interface ProfileComponent extends React.ReactElement {
//   auth?: {
//     role: string;
//     loading: FC;
//     unauthorized: string; // redirect to this url
//   };
// }

// const Auth: FC<{ children: React.ReactElement }> = ({ children }) => {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true });

//   if (true) {
//     return <div>Loading...</div>;
//   }

//   return children;
// };

// const AuthProvider: FC<{ children: ProfileComponent }> = ({ children }) => {
//   return (
//     <SessionProvider>
//       {React.Children.map(children, (child) => {
//         if (child.auth) {
//           return <Auth>{child}</Auth>;
//         }
//         return child;
//       })}
//     </SessionProvider>
//   );
// };

// export default AuthProvider;
