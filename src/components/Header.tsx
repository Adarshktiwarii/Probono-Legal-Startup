"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Scale } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Eligibility", href: "/eligibility" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Donate", href: "/donate" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  // Hide on dashboard and auth pages (they have their own layout)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/advocate") || pathname?.startsWith("/signin") || pathname?.startsWith("/signup") || pathname?.startsWith("/apply")) return null;

  return (
    <>
      <div className="ns-bar" aria-hidden="true" />

      <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-200 ${scrolled ? "shadow-sm border-border" : "border-transparent"}`}>
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-[#1E3A5F] flex items-center justify-center transition-transform group-hover:scale-105">
              <Scale className="w-3.5 h-3.5 text-[#C69C3F]" />
            </div>
            <span className="font-medium text-[15px] text-foreground tracking-tight">IPBLI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-[13px] rounded-full transition-colors ${
                    isActive
                      ? "text-[#1E3A5F] bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/signin"
              className="hidden md:inline-flex text-[13px] text-[#1E3A5F] hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
            >
              Sign in
            </Link>
            <Link href="/apply" className="hidden md:inline-flex">
              <Button className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-[13px] px-4 h-8 shadow-none">
                Apply for Help
              </Button>
            </Link>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
              <nav className="container py-3 flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={`px-4 py-2.5 text-sm rounded-lg transition-colors ${isActive ? "text-[#1E3A5F] bg-primary/10" : "text-muted-foreground hover:bg-muted"}`}>
                      {link.name}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                  <Link href="/signin"
                    className="text-sm text-[#1E3A5F] py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-center">
                    Sign in
                  </Link>
                  <Link href="/apply">
                    <Button className="w-full rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-10 shadow-none">
                      Apply for Help
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
