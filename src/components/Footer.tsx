"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Heart } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/advocate") || pathname?.startsWith("/signin") || pathname?.startsWith("/signup") || pathname?.startsWith("/apply")) return null;

  return (
    <footer className="border-t border-[#e8e3db] bg-[#F9F7F4]">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#1E3A5F] rounded-md flex items-center justify-center">
                <Scale className="w-3 h-3 text-[#C69C3F]" />
              </div>
              <span className="text-sm font-medium text-[#1A1A2E]">IPBLI</span>
            </Link>
            <p className="text-xs text-[#6B7280] leading-relaxed pr-8">
              A Section 8 non-profit providing free legal representation to eligible citizens across India.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#1A1A2E] uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><Link href="/apply" className="hover:text-[#1E3A5F] transition-colors">Apply for Aid</Link></li>
              <li><Link href="/eligibility" className="hover:text-[#1E3A5F] transition-colors">Eligibility</Link></li>
              <li><Link href="/faq" className="hover:text-[#1E3A5F] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#1A1A2E] uppercase tracking-wider mb-3">Organization</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><Link href="/about" className="hover:text-[#1E3A5F] transition-colors">About</Link></li>
              <li><Link href="/volunteer" className="hover:text-[#1E3A5F] transition-colors">Volunteer</Link></li>
              <li><Link href="/donate" className="hover:text-[#1E3A5F] transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#1A1A2E] uppercase tracking-wider mb-3">Govt Initiatives</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><a href="https://tele-law.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E3A5F] transition-colors">Tele-Law</a></li>
              <li><a href="https://probono-doj.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E3A5F] transition-colors">Nyaya Bandhu</a></li>
              <li><a href="https://ecourts.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E3A5F] transition-colors">eCourts India</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-[#1A1A2E] uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><Link href="/privacy" className="hover:text-[#1E3A5F] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#1E3A5F] transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-[#1E3A5F] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-[#e8e3db] flex flex-col items-center gap-2 text-[11px] text-[#6B7280]">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
            <p>&copy; {new Date().getFullYear()} IPBLI Foundation. All rights reserved.</p>
            <p>Registered Section 8 Non-Profit · New Delhi, India</p>
          </div>
          <p className="flex items-center mt-2">
            Developed and hosted by IPBLI with love in Bangalore, India <Heart className="w-3.5 h-3.5 text-[#C75B39] mx-1 fill-current" />
          </p>
        </div>
      </div>

      <div className="ns-bar" aria-hidden="true" />
    </footer>
  );
}
