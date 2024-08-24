import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RateMyProf AI",
  description: "created by @shafi & @alex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: `primary-text-gradient hover:text-primary-500`,
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
