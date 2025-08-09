import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zach Rempell",
  description: "Software engineer passionate about building meaningful technology. Portfolio, blog, and projects.",
  authors: [{ name: "Zach Rempell" }],
  creator: "Zach Rempell",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zachrempell.com",
    title: "Zach Rempell",
    description: "Software engineer passionate about building meaningful technology.",
    siteName: "Zach Rempell",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zach Rempell",
    description: "Software engineer passionate about building meaningful technology.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
