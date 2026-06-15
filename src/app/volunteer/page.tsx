import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale, Landmark, FileCheck, Users, Clock } from "lucide-react";

export default function Volunteer() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs text-[#5B8A72] font-medium uppercase tracking-wider mb-3">For Advocates</p>
          <h1 className="text-3xl md:text-4xl font-medium text-[#1A1A2E] leading-tight tracking-tight mb-5">
            Empanel as a pro bono advocate
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            NyayaSetu maintains a carefully curated panel of ethical, qualified advocates committed to representing citizens who cannot afford private counsel.
          </p>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Why join */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-4">Why join our panel?</h2>
          <div className="space-y-3 text-sm text-[#6B7280] leading-relaxed">
            <p>Most legal technology platforms help users find lawyers for a fee. NyayaSetu does not operate a marketplace. We coordinate representation for indigent citizens who genuinely cannot afford private counsel.</p>
            <p>By joining our panel, you maintain your full professional independence while we handle case intake, eligibility screening, document collection, and impact reporting. You focus on what you do best — advocating for your client.</p>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Selection criteria */}
      <section className="py-16 md:py-20 bg-[#F9F7F4]">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-8">Selection criteria</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Scale, label: "Active Bar Council Registration", desc: "Valid enrollment with any State Bar Council in India." },
              { icon: Landmark, label: "Excellent Professional Standing", desc: "No pending disciplinary proceedings or ethical complaints." },
              { icon: FileCheck, label: "Relevant Domain Expertise", desc: "Experience in criminal law, family law, or constitutional matters." },
              { icon: Users, label: "Commitment to Public Service", desc: "Willingness to dedicate a minimum of 2 cases per quarter." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 p-4 border border-[#e8e3db] rounded-xl bg-white">
                <div className="w-9 h-9 bg-[#1E3A5F]/8 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">{item.label}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Status */}
      <section className="py-16 md:py-20">
        <div className="container max-w-lg text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C75B39] bg-[#C75B39]/10 px-3 py-1 rounded-full mb-4">
            <Clock className="w-3 h-3" /> Panel currently full
          </div>
          <h2 className="text-xl font-medium text-[#1A1A2E] mb-3">Phase 1 onboarding is complete</h2>
          <p className="text-sm text-[#6B7280] mb-6">
            We are currently operating in Delhi and Madhya Pradesh. Phase 2 onboarding for additional regions opens in Q4 2026.
          </p>
          <Button disabled className="rounded-full bg-[#1E3A5F] text-white text-sm h-10 px-6 shadow-none opacity-50 cursor-not-allowed">
            Panel Full — Phase 1
          </Button>
          <p className="text-xs text-[#6B7280] mt-4">
            For urgent inquiries, contact <Link href="/contact" className="text-[#1E3A5F] hover:underline">our operations team</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
