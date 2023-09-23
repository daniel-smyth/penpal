import "../styles/globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import cx from "classnames";
import Providers from "./providers";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cx(sfPro.variable, inter.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
