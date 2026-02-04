import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Élixir de Charlevoix | Herbal Liqueur",
  description: "An intense, richly layered herbal liqueur inspired by the boreal forests of Québec's Charlevoix region. Made from 74 botanicals.",
  keywords: ["herbal liqueur", "Charlevoix", "Quebec", "spirits", "botanical", "artisanal"],
  openGraph: {
    title: "Élixir de Charlevoix",
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
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
