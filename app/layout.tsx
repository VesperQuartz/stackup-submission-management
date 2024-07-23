import type { Metadata } from "next";
import { Asap } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./providers/convex-client-provider";
import { NavBar } from "@/components/navbar";

import { Toaster } from "@/components/ui/toaster";
import BarProviders from "./providers/bar-provider";
const inter = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "stackup-submission",
  description: "stackup-submission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BarProviders>
          <ConvexClientProvider>
            <NavBar />
            {children}
          </ConvexClientProvider>
        </BarProviders>
        <Toaster />
      </body>
    </html>
  );
}
