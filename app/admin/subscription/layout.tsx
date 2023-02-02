import Provider from './provider';

export default function SubscriptionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
