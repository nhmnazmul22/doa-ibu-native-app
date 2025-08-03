import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/RootLayout";

const NunitoFont = Nunito({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doa Ibu - Mother Prayer",
  description: "This is the admin panel of doa ibu android application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NunitoFont.className} ${NunitoFont.className} antialiased overflow-x-hidden`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
