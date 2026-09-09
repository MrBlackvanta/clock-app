import { SITE_URL } from "@/data";
import { NIGHT_HOUR } from "@/lib";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const name = "clock.";
const title = `${name} | The time where you are`;
const description =
  "See the time where you are, with the greeting and the view that match your part of the day. Refresh for a new programming quote whenever you like.";

const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "The clock. app beside the headline “The time where you are”.",
};

const periodScript = `document.documentElement.dataset.period=new Date().getHours()>=${NIGHT_HOUR}?"night":"day"`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: name,
    locale: "en_US",
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#303030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: periodScript }} />
        {children}
      </body>
    </html>
  );
}
