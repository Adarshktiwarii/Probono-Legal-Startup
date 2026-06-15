import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Scale, FileCheck, Heart, AlertTriangle, Home } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-courthouse.png" alt="Indian courthouse building" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-sm text-[#1E3A5F] font-medium mb-4 tracking-wide bg-[#C69C3F]/15 px-4 py-1.5 rounded-full border border-[#C69C3F]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C69C3F]" />
              India&apos;s Pro Bono Legal Institution
            </p>
            <h1 className="text-3xl md:text-[42px] font-medium text-[#1A1A2E] leading-tight tracking-tight mb-5">
              Justice should never depend on your ability to pay.
            </h1>
            <p className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-lg">
              NyayaSetu provides free legal representation to eligible citizens through our empaneled network of qualified advocates. No fees. No middlemen. Just justice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply">
                <Button className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 px-7 text-sm shadow-none w-full sm:w-auto">
                  Apply for free legal aid <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button variant="outline" className="rounded-full border-[#e8e3db] text-[#6B7280] hover:bg-[#F9F7F4] h-11 px-7 text-sm shadow-none w-full sm:w-auto">
                  Check eligibility
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[#e8e3db] bg-[#F9F7F4]">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#1E3A5F]" /> Registered Section 8 Non-Profit</span>
            <span className="hidden sm:inline text-[#d4cfc7]">·</span>
            <span className="flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-[#5B8A72]" /> Companies Act, 2013</span>
            <span className="hidden sm:inline text-[#d4cfc7]">·</span>
            <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-[#C69C3F]" /> Article 39A Aligned</span>
            <span className="hidden sm:inline text-[#d4cfc7]">·</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#C75B39]" /> Empaneled Advocate Network</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-[#1A1A2E] mb-2">How NyayaSetu works</h2>
            <p className="text-sm text-[#6B7280] max-w-md mx-auto">A dignified, three-step process from application to courtroom representation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#e8e3db] max-w-4xl mx-auto rounded-xl overflow-hidden border border-[#e8e3db]">
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white text-sm flex items-center justify-center font-medium">1</span>
                <h3 className="text-sm font-medium text-[#1A1A2E]">You apply</h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">Fill out a secure intake form with your personal details, financial situation, and the legal issue you face.</p>
            </div>
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#C69C3F] text-white text-sm flex items-center justify-center font-medium">2</span>
                <h3 className="text-sm font-medium text-[#1A1A2E]">We review</h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">Our operations team manually assesses your eligibility based on financial need, vulnerability, and case impact.</p>
            </div>
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#5B8A72] text-white text-sm flex items-center justify-center font-medium">3</span>
                <h3 className="text-sm font-medium text-[#1A1A2E]">You get represented</h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">A qualified, empaneled advocate is assigned to your case and represents you at zero cost.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Who we help */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image src="/images/people-helped.png" alt="An advocate helping a citizen with legal documents" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-[#1A1A2E] mb-3">Cases we are accepting</h2>
              <p className="text-sm text-[#6B7280] mb-6">We focus on matters where fundamental rights, liberty, or safety are at immediate risk.</p>
              <div className="space-y-3">
                {[
                  { icon: AlertTriangle, label: "Wrongful Arrest & Detention", color: "#C75B39" },
                  { icon: Shield, label: "Bail Assistance (First-time offenders)", color: "#1E3A5F" },
                  { icon: Heart, label: "Fundamental Rights Violations", color: "#C69C3F" },
                  { icon: Home, label: "Senior Citizen Eviction & Abuse", color: "#5B8A72" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border border-[#e8e3db] hover:bg-[#F9F7F4] transition-colors">
                    <item.icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                    <span className="text-sm text-[#1A1A2E]">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/eligibility" className="inline-flex items-center text-sm text-[#1E3A5F] hover:underline mt-5">
                View full eligibility guidelines <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Institutional statement */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs text-[#C69C3F] font-medium uppercase tracking-wider mb-3">Our identity</p>
              <h2 className="text-2xl font-medium text-[#1A1A2E] mb-4">
                We are not a marketplace.<br />We are an institution.
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                NyayaSetu does not connect users with lawyers for a fee. We do not operate a referral service. We assume direct institutional responsibility for the legal aid process — from intake to courtroom representation.
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                Our advocates are empaneled after rigorous verification. Our operations team conducts manual eligibility reviews. Every case we accept is one we commit to seeing through.
              </p>
              <Link href="/about" className="inline-flex items-center text-sm text-[#1E3A5F] hover:underline">
                Read our institutional charter <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            <div className="relative h-[280px] md:h-[340px] rounded-2xl overflow-hidden">
              <Image src="/images/legal-scales.png" alt="Scales of justice with Indian law books" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Stats */}
      <section className="py-14">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-medium text-[#1E3A5F]">₹0</div>
              <div className="text-xs text-[#6B7280] mt-1">Cost to citizen</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-[#C75B39]">100%</div>
              <div className="text-xs text-[#6B7280] mt-1">Pro bono</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-[#C69C3F]">Delhi & MP</div>
              <div className="text-xs text-[#6B7280] mt-1">Phase 1 regions</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-[#5B8A72]">Secure</div>
              <div className="text-xs text-[#6B7280] mt-1">Encrypted platform</div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="container max-w-xl text-center">
          <h2 className="text-2xl font-medium text-[#1A1A2E] mb-3">Are you facing a legal crisis?</h2>
          <p className="text-sm text-[#6B7280] mb-8">
            If you cannot afford legal representation and your rights are at risk, we are here to help. Our application takes less than 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/apply">
              <Button className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 px-7 text-sm shadow-none w-full sm:w-auto">
                Begin your application <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline" className="rounded-full border-[#e8e3db] text-[#6B7280] hover:bg-[#F9F7F4] h-11 px-7 text-sm shadow-none w-full sm:w-auto">
                Read the FAQ
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="rounded-full border-[#C69C3F] text-[#C69C3F] hover:bg-[#C69C3F]/5 h-11 px-7 text-sm shadow-none w-full sm:w-auto">
                Donate to the cause
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
