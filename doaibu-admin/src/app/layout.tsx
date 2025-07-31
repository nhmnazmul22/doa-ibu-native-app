import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/AppSideBar";
import Header from "@/components/Layout/Header";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${NunitoFont.className} ${NunitoFont.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
