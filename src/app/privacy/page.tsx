export default function Privacy() {
  return (
    <div className="py-16">
      <div className="container max-w-2xl">
        <h1 className="text-2xl font-medium text-[#1A1A2E] mb-2">Privacy Policy</h1>
        <p className="text-xs text-[#6B7280] mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-[#6B7280] leading-relaxed">
          <section>
            <h2 className="text-base font-medium text-[#1A1A2E] mb-2">Information We Collect</h2>
            <p>IPBLI collects personal, financial, and case information solely for the purpose of assessing eligibility and facilitating pro bono legal representation. This includes your name, contact details, income information, and details about your legal matter.</p>
          </section>

          <div className="border-t border-[#e8e3db]" />

          <section>
            <h2 className="text-base font-medium text-[#1A1A2E] mb-2">How We Use Your Information</h2>
            <p>Your data is used exclusively for case assessment, advocate matching, and internal reporting. We do not sell, rent, or share your information with third parties for commercial purposes.</p>
          </section>

          <div className="border-t border-[#e8e3db]" />

          <section>
            <h2 className="text-base font-medium text-[#1A1A2E] mb-2">Data Security</h2>
            <p>All data is encrypted in transit and at rest. Access to personal information is restricted to authorized members of the IPBLI Operations Team and empaneled advocates assigned to your case.</p>
          </section>

          <div className="border-t border-[#e8e3db]" />

          <section>
            <h2 className="text-base font-medium text-[#1A1A2E] mb-2">Contact</h2>
            <p>For privacy-related inquiries, contact <a href="mailto:admin@ipbli.org" className="text-[#1E3A5F] hover:underline">admin@ipbli.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
