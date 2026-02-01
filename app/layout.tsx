import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import LocaleProvider from "@/components/shared/LocaleProvider";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const kefirMedium = localFont({
  src: "./font/kefir-medium.otf",
  variable: "--font-kefir-medium",
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://yunlai-porcelian-art-co.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${kefirMedium.variable} antialiased`}
      >
        <LocaleProvider>
          <Topbar />
          <Navbar />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
