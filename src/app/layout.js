import { AuthProvider } from "./Providers";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "defndr",
  description: "defndr website",
};
import { Wagmi } from "./wagmi";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wagmi>
          <AuthProvider>{children}</AuthProvider>
        </Wagmi>
        <Analytics/>
      </body>
    </html>
  );
}
