import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patricia Nieto",
  description: "Patricia Nieto es una artista visual que explora la intersección entre fotografía y computer graphics, creando obras que fusionan lo analógico y lo digital en una práctica post-disciplinaria.",
  keywords: ["Patricia Nieto", "artista visual", "fotografía", "computer graphics", "arte digital", "post-disciplinario"],
  authors: [{ name: "Patricia Nieto" }],
  openGraph: {
    title: "Patricia Nieto",
    description: "Patricia Nieto es una artista visual que explora la intersección entre fotografía y computer graphics, creando obras que fusionan lo analógico y lo digital en una práctica post-disciplinaria.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patricia Nieto",
    description: "Patricia Nieto es una artista visual que explora la intersección entre fotografía y computer graphics, creando obras que fusionan lo analógico y lo digital en una práctica post-disciplinaria.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
