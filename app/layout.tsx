import type { Metadata } from "next";
import { garamond, fell } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "East of the 101",
  description:
    "Writings from California — on men, animals, and the ground beneath both.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${fell.variable}`}>
      <body className="font-serif antialiased bg-[#050505] text-neutral-300">
        {children}
      </body>
    </html>
  );
}
