export default function Terms() {
  return (
    <div className="py-16">
      <div className="container max-w-2xl">
        <h1 className="text-2xl font-medium text-foreground mb-2">Terms of Service</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-base font-medium text-foreground mb-2">Acceptance</h2>
            <p>By using the IPBLI platform, you agree to these terms. IPBLI is a non-profit, pro bono legal aid organization. We are not a law firm and do not provide legal advice directly through this website.</p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-base font-medium text-foreground mb-2">Eligibility</h2>
            <p>Access to IPBLI's pro bono legal services is subject to eligibility criteria. Submitting an application does not guarantee legal representation. All decisions are made by the IPBLI Operations Team.</p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-base font-medium text-foreground mb-2">Truthful Information</h2>
            <p>Applicants must provide truthful and accurate information. Misrepresentation of financial status or case details will result in immediate termination of services.</p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-base font-medium text-foreground mb-2">Contact</h2>
            <p>Questions about these terms can be directed to <a href="mailto:admin@ipbli.org" className="text-[#1E3A5F] hover:underline">admin@ipbli.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
