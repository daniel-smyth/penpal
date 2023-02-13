import { PresentationLayout } from "@components/layouts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PresentationLayout>{children}</PresentationLayout>;
}
