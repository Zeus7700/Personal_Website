import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zack Rempell",
  description: "Engineer passionate about building meaningful technology. Portfolio, blog, and projects.",
  authors: [{ name: "Zack Rempell" }],
  creator: "Zack Rempell",
  icons: {
    icon: '/z-favicon.svg',
    shortcut: '/z-favicon.svg',
    apple: '/z-favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zackrempell.com",
    title: "Zack Rempell",
    description: "Engineer passionate about building meaningful technology.",
    siteName: "Zack Rempell",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zack Rempell",
    description: "Engineer passionate about building meaningful technology.",
    creator: "@zachrempell",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
