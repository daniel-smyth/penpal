import AuthProvider, { ProfileComponent } from './provider';

interface ProfileLayoutProps {
  children: ProfileComponent | React.ReactElement;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
