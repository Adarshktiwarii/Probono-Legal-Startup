import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqs = [
  { q: "Is IPBLI a government organization?", a: "No. IPBLI is an independent, non-governmental, Section 8 non-profit organization registered under the Companies Act, 2013. However, our objectives align closely with the constitutional mandate under Article 39A, which directs the State to provide free legal aid to ensure that opportunities for securing justice are not denied to any citizen." },
  { q: "How much does the legal representation cost?", a: "Absolutely nothing. If your application is approved through our eligibility screening, all advocate professional fees are covered pro bono. You do not pay IPBLI, nor do you pay the assigned advocate. There are no hidden charges or future obligations." },
  { q: "Can I choose my own advocate?", a: "No. To maintain institutional integrity and ensure the equitable distribution of pro bono cases, the IPBLI Operations Team assigns advocates based on their domain expertise, availability, geographic jurisdiction, and the specific nature of your case." },
  { q: "What happens if I provide false financial information?", a: "All applications require a signed declaration of financial need. If we discover that an applicant has misrepresented their income or financial status to secure free services, IPBLI reserves the right to immediately terminate the legal engagement and report the misrepresentation to relevant authorities." },
  { q: "Do you handle property or commercial disputes?", a: "Generally, no. Our resources are strictly reserved for matters concerning fundamental rights, wrongful detention, domestic abuse, senior citizen protection, and severe exploitation. We do not accept commercial, corporate, tax, or real estate disputes." },
  { q: "How long does the eligibility review take?", a: "Our operations team typically completes the eligibility review within 3–5 business days of receiving a complete application. Incomplete applications or those requiring additional documentation may take longer. You will receive an SMS notification about your status." },
  { q: "Which regions do you currently serve?", a: "Phase 1 operations cover Delhi NCR and select districts in Madhya Pradesh. We plan to expand to additional states in Phase 2, targeted for Q4 2026. Check our website for updates on regional availability." },
];

export default function FAQ() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs text-[#C75B39] font-medium uppercase tracking-wider mb-3">Support</p>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground leading-tight tracking-tight mb-5">
            Frequently asked questions
          </h1>
          <p className="text-base text-muted-foreground">
            Clear answers about how IPBLI works, who qualifies, and what to expect.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-1">
                <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-[#1E3A5F] hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm font-medium text-foreground mb-2">Other Government Initiatives</p>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              If you do not meet our eligibility criteria or live outside our operational regions, you may still find help through these official Government of India portals:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
              <Link href="/contact" className="inline-flex items-center text-sm text-[#1E3A5F] hover:underline font-medium">
                Contact our operations team <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
