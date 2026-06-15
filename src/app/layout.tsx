import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
};

export const metadata: Metadata = {
  title: "IPBLI — Free Legal Aid for Every Citizen",
  description: "India's pro bono legal representation organization. Connecting eligible citizens with qualified advocates at zero cost.",
  keywords: 'pro bono, free legal aid, IPBLI, legal help India, bail assistance, fundamental rights, Delhi, Madhya Pradesh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-[#C69C3F]/20 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
