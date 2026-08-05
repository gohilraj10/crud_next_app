import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "n@/providers/ReactQueryProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "CRUD App",
  description: "Small CRUD Application using next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
