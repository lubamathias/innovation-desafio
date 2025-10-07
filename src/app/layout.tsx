import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Innovation Brindes",
  description: "Catálogo de produtos personalizados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={quicksand.variable}>{children}</body>
    </html>
  );
}