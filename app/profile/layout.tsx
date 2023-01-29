import AuthProvider, { ProfileComponent } from './provider';

interface ProfileLayoutProps {
  children: ProfileComponent | React.ReactElement;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
