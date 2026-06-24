import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lyrix Studio — Paint Your Sound",
  description:
    "Platform desain lirik real-time pertama yang mengubah teks lagu menjadi kanvas visual interaktif.",
  openGraph: {
    title: "Lyrix Studio — Paint Your Sound",
    description:
      "Desain lirik live dengan animasi audio-reactive, ekspor 4K, dan integrasi hardware.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
