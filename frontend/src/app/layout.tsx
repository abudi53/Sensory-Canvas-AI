import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutClient from "../components/RootLayoutClient";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SoundControlProvider } from "@/context/SoundControlContext";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "./actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sensory Canvas AI",
  description: "Inmersive AI art generated by you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar user={user} />
          <SoundControlProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </SoundControlProvider>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
