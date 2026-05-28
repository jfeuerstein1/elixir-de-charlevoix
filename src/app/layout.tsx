import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/siteConfig";

const outfit = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.pageTitle,
  description: "An intense, richly layered herbal liqueur inspired by the boreal forests of Québec's Charlevoix region. Made from 74 botanicals.",
  keywords: ["herbal liqueur", "Charlevoix", "Quebec", "spirits", "botanical", "artisanal"],
  openGraph: {
    title: siteConfig.pageTitle,
    description: "An herbal liqueur inspired by the boreal forests of Charlevoix",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
