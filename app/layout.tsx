import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import LocaleProvider from "@/components/shared/LocaleProvider";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
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
  metadataBase: new URL("https://www.yixingyunlai.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SS0V2JZRZS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SS0V2JZRZS');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${kefirMedium.variable} antialiased`}>
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
