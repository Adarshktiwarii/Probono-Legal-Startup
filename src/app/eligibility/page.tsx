"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, FilePlus, ShieldCheck, Scale } from "lucide-react";

const accepting = [
  "Violation of Fundamental Rights (Article 14–32)",
  "Wrongful Arrest, Illegal Detention & Custodial Abuse",
  "Bail Assistance for First-time & Vulnerable Offenders",
  "Senior Citizen Eviction, Abuse & Maintenance",
  "Criminal Intimidation, Threats & Extortion",
  "False and Frivolous Criminal Cases",
  "Any matter where personal liberty, safety, or dignity is at immediate risk",
];

export default function Eligibility() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs text-[#C69C3F] font-medium uppercase tracking-wider mb-3">Eligibility</p>
          <h1 className="text-3xl md:text-4xl font-medium text-[#1A1A2E] leading-tight tracking-tight mb-5">
            Who qualifies for free representation?
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            IPBLI exists for people who genuinely need support. Every application is manually reviewed by our operations team against strict institutional criteria.
          </p>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Three pillars */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-8 text-center">Our three-pillar assessment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "1", color: "#1E3A5F", title: "Financial Need", desc: "Primary focus on individuals unable to afford private representation without severe hardship to their household." },
              { num: "2", color: "#C69C3F", title: "Vulnerability", desc: "Priority given to women, senior citizens, persons with disabilities, first-time offenders, and marginalized communities." },
              { num: "3", color: "#5B8A72", title: "Case Impact", desc: "Matters posing an immediate threat to fundamental rights, personal liberty, physical safety, or human dignity." },
            ].map((pillar) => (
              <div key={pillar.title} className="border border-[#e8e3db] rounded-xl p-6">
                <span className="w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-medium mb-4" style={{ background: pillar.color }}>{pillar.num}</span>
                <h3 className="text-sm font-medium text-[#1A1A2E] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Image + Case acceptance */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2 relative h-[200px] md:h-full min-h-[250px] rounded-xl overflow-hidden">
              <Image src="/images/courtroom-interior.png" alt="Indian courtroom interior with judge's bench" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-xl font-medium text-[#1A1A2E] mb-5">Cases we accept</h2>

              <h3 className="text-sm font-medium text-[#5B8A72] flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4" /> Currently accepting
              </h3>
              <ul className="space-y-2 mb-6">
                {accepting.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B8A72] mt-1.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-[#e8e3db] pt-4">
                <p className="text-xs text-[#6B7280] italic">
                  This list is not exhaustive. If your fundamental rights are at risk and you cannot afford legal counsel, we encourage you to apply. Each case is reviewed on its individual merit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Operational regions */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Where we operate */}
            <div>
              <p className="text-xs text-[#C69C3F] font-medium uppercase tracking-wider mb-3">Operational Regions</p>
              <h2 className="text-xl font-medium text-[#1A1A2E] mb-4">Currently serving two states</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                IPBLI is currently operational in the <span className="text-[#1A1A2E] font-medium">National Capital Territory of Delhi</span> and the <span className="text-[#1A1A2E] font-medium">State of Madhya Pradesh</span>. We plan to expand to additional states in upcoming phases.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 border border-[#e8e3db] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#1E3A5F]/8 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                  <p className="text-sm font-medium text-[#1A1A2E]">New Delhi</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">NCT of Delhi</p>
                </div>
                <div className="flex-1 border border-[#e8e3db] rounded-xl p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#C69C3F]/10 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-[#C69C3F]" />
                  </div>
                  <p className="text-sm font-medium text-[#1A1A2E]">Madhya Pradesh</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">All districts</p>
                </div>
              </div>
            </div>

            {/* Courts we represent at */}
            <div>
              <p className="text-xs text-[#1E3A5F] font-medium uppercase tracking-wider mb-3">Court Coverage</p>
              <h2 className="text-xl font-medium text-[#1A1A2E] mb-4">We represent you at every level</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                Our empaneled advocates represent citizens across all tiers of the Indian judiciary — from trial courts to the apex court.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#e8e3db]">
                  <span className="w-8 h-8 rounded-full bg-[#5B8A72] text-white text-xs flex items-center justify-center font-medium shrink-0">1</span>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A2E]">District & Sessions Courts</p>
                    <p className="text-[11px] text-[#6B7280]">Trial courts — where most cases begin</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#e8e3db]">
                  <span className="w-8 h-8 rounded-full bg-[#C69C3F] text-white text-xs flex items-center justify-center font-medium shrink-0">2</span>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A2E]">High Courts</p>
                    <p className="text-[11px] text-[#6B7280]">Delhi HC · MP HC (Jabalpur, Indore & Gwalior)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#e8e3db]">
                  <span className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white text-xs flex items-center justify-center font-medium shrink-0">3</span>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A2E]">Supreme Court of India</p>
                    <p className="text-[11px] text-[#6B7280]">The apex court — for appeals & constitutional matters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Every stage */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container max-w-3xl text-center">
          <p className="text-xs text-[#5B8A72] font-medium uppercase tracking-wider mb-3">Full Representation</p>
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-3">Every stage of your legal journey</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-8 max-w-lg mx-auto">
            Whether you need to file a fresh case, challenge a subordinate court order, or file an appeal — we represent you at <span className="text-[#1A1A2E] font-medium">every phase</span> of the legal process.
          </p>

          <div className="grid grid-cols-3 gap-px bg-[#e8e3db] rounded-xl overflow-hidden border border-[#e8e3db] max-w-2xl mx-auto">
            <div className="bg-white p-6">
              <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/8 flex items-center justify-center mx-auto mb-3">
                <FilePlus className="w-4 h-4 text-[#1E3A5F]" />
              </div>
              <p className="text-sm font-medium text-[#1A1A2E] mb-1">Fresh Filing</p>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">New FIRs, complaints, bail applications & petitions</p>
            </div>
            <div className="bg-white p-6">
              <div className="w-10 h-10 rounded-full bg-[#C69C3F]/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-4 h-4 text-[#C69C3F]" />
              </div>
              <p className="text-sm font-medium text-[#1A1A2E] mb-1">Challenge Orders</p>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">Revisions & challenges against lower court decisions</p>
            </div>
            <div className="bg-white p-6">
              <div className="w-10 h-10 rounded-full bg-[#5B8A72]/10 flex items-center justify-center mx-auto mb-3">
                <Scale className="w-4 h-4 text-[#5B8A72]" />
              </div>
              <p className="text-sm font-medium text-[#1A1A2E] mb-1">Appeals</p>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">High Court & Supreme Court appeals at every stage</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* CTA */}
      <section className="py-14">
        <div className="container max-w-xl text-center">
          <p className="text-sm text-[#6B7280] mb-4">Think you qualify? Our application takes less than 10 minutes.</p>
          <Link href="/apply" className="inline-flex items-center text-sm text-[#1E3A5F] hover:underline font-medium mb-8">
            Apply for free legal aid <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <div className="pt-8 border-t border-[#e8e3db]">
            <p className="text-sm font-medium text-[#1A1A2E] mb-2">Other Government Initiatives</p>
            <p className="text-sm text-[#6B7280] mb-4 max-w-md mx-auto">
              If you do not meet our eligibility criteria or live outside our operational regions, you may still find help through these official Government of India portals:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://tele-law.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#C69C3F] hover:underline">
                Tele-Law Portal <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
              <span className="text-[#d4cfc7] hidden sm:inline">·</span>
              <a href="https://probono-doj.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#C69C3F] hover:underline">
                Nyaya Bandhu <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
              <span className="text-[#d4cfc7] hidden sm:inline">·</span>
              <a href="https://ecourts.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#C69C3F] hover:underline">
                eCourts India <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

