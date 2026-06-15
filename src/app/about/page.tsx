import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs text-[#1E3A5F] font-medium uppercase tracking-wider mb-3">About NyayaSetu</p>
          <h1 className="text-3xl md:text-4xl font-medium text-[#1A1A2E] leading-tight tracking-tight mb-5">
            An institution built for justice, not profit.
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            NyayaSetu is a registered Section 8 non-profit organization established to ensure that no eligible citizen is denied justice due to financial constraints. We provide free legal representation through our own institutional framework.
          </p>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Image strip */}
      <section className="relative h-[240px] md:h-[320px]">
        <Image src="/images/hero-courthouse.png" alt="Indian high court interior" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Why we exist */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-5">Why we exist</h2>
          <div className="space-y-4 text-sm text-[#6B7280] leading-relaxed">
            <p>India promises justice to every citizen. Yet for millions, justice remains inaccessible — not because the law does not exist, but because access to legal representation remains financially out of reach.</p>
            <p>A right that cannot be defended is a right that effectively does not exist.</p>
            <p>NyayaSetu is not a legal marketplace. We are not a lawyer discovery platform. We are not a referral service. We are a pro bono legal representation organization that directly provides legal assistance to eligible citizens through our empaneled network of advocates.</p>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Core belief */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container max-w-3xl">
          <div className="border-l-4 border-l-[#1E3A5F] pl-6 py-2">
            <p className="text-lg text-[#1A1A2E] leading-relaxed italic">
              &ldquo;Justice should not be determined by wealth. The ability to defend one&apos;s rights should never depend upon the ability to pay. Legal representation should not be a privilege reserved for those with financial means.&rdquo;
            </p>
            <p className="text-xs text-[#6B7280] mt-3">— NyayaSetu Founding Charter</p>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Institutional pillars */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-8">Institutional pillars</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { color: "#1E3A5F", title: "Representation", desc: "Provide legal representation through empaneled, high-caliber advocates who are committed to public service." },
              { color: "#C75B39", title: "Accessibility", desc: "Remove geographical and financial barriers through technology, so that citizens in any district can seek help." },
              { color: "#C69C3F", title: "Accountability", desc: "Create measurable standards for quality and outcomes. Every case is tracked, every outcome is reported." },
              { color: "#5B8A72", title: "Technology", desc: "Use technology to improve access and efficiency — not to replace legal expertise or human empathy." },
            ].map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: pillar.color }} />
                <div>
                  <h3 className="text-sm font-medium text-[#1A1A2E] mb-1">{pillar.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Theory of change */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-6">Theory of change</h2>
          <div className="space-y-4">
            {[
              "If eligible citizens receive representation, then rights can be defended.",
              "When rights can be defended, public trust in the justice system increases.",
              "When public trust increases, institutions become stronger for everyone.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1E3A5F] text-white text-xs flex items-center justify-center font-medium shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#6B7280] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-[#1E3A5F] mt-8">NyayaSetu exists at the intersection of justice, technology, and public trust.</p>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* North star */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-4">Our north star</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
            No eligible citizen should be denied justice because they cannot afford legal representation. Everything we build, every partnership we form, every decision we make, and every case we accept will be guided by this principle.
          </p>
          <Link href="/apply" className="inline-flex items-center text-sm text-[#1E3A5F] hover:underline">
            Apply for legal assistance <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
