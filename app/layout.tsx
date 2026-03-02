import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emgee-contracting-website.vercel.app"),
  title: "Emgee Contracting | Trusted Roofing Contractor in Lakewood, NJ",
  description:
    "Professional roofing, siding & gutter services in Lakewood, NJ. 10+ years experience, free inspections, and quality craftsmanship. Call (732) 806-5656.",
  openGraph: {
    title: "Emgee Contracting | Trusted Roofing in Lakewood, NJ",
    description:
      "Professional roofing, siding & gutter services. 10+ years experience. Free inspections. Call (732) 806-5656.",
    images: ["/og-image.png"],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
