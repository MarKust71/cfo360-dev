import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
// import { Geist, Geist_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CFO360",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <UserProvider>
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={`${GeistSans.className} ${GeistMono.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
