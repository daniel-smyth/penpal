import './globals.css';
import Providers from './providers';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  console.log('NODE_ENV server', process.env.NODE_ENV);
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
