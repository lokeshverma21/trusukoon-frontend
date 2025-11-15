import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import ClientLayout, { ClientGuard } from "./(client)/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TruSukoon",
    template: "%s | TruSukoon",
  },
  description: "A gentle step towards healing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar/> */}
        <StoreProvider>
          {/* <ClientLayout> */}
        <ClientGuard>

          <Toaster position="bottom-right"/>
          {children}
        </ClientGuard>
          {/* </ClientLayout> */}
        </StoreProvider>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
