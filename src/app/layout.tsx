import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NyayaSetu — Free Legal Aid for Every Citizen",
  description: "India's pro bono legal representation organization. Connecting eligible citizens with qualified advocates at zero cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-[#202124] selection:bg-blue-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
