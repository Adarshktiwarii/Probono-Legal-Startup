"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Heart, Building2, User, Receipt, Shield, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 4;

const presetAmounts = [
  { value: 1000, label: "₹1,000", impact: "Covers court filing fees for 1 case" },
  { value: 2500, label: "₹2,500", impact: "Covers advocate travel for 2 hearings" },
  { value: 5000, label: "₹5,000", impact: "Funds a full bail application" },
  { value: 10000, label: "₹10,000", impact: "Supports one complete case lifecycle" },
  { value: 25000, label: "₹25,000", impact: "Sponsors a month of legal aid operations" },
  { value: 50000, label: "₹50,000", impact: "Funds 5 complete case representations" },
];

const fundAllocation = [
  { label: "Legal representation & court fees", pct: 60, color: "#1E3A5F" },
  { label: "Case documentation & research", pct: 20, color: "#C69C3F" },
  { label: "Technology & operations", pct: 15, color: "#5B8A72" },
  { label: "Admin & compliance", pct: 5, color: "#C75B39" },
];

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState("");

  const [form, setForm] = useState({
    donorType: "" as "individual" | "corporate" | "",
    frequency: "" as "onetime" | "monthly" | "",
    amount: 0, customAmount: "",
    fullName: "", email: "", phone: "", pan: "",
    companyName: "", cinNumber: "", csrContact: "",
    paymentMethod: "" as "upi" | "bank" | "",
  });

  const set = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));
  const selectedAmount = form.amount || (form.customAmount ? parseInt(form.customAmount) : 0);

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!(form.donorType && form.frequency && selectedAmount > 0);
      case 2:
        if (form.donorType === "corporate") return !!(form.fullName && form.email && form.phone && form.companyName);
        return !!(form.fullName && form.email && form.phone);
      case 3: return !!form.paymentMethod;
      case 4: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const stepLabels = ["Contribution", "Details", "Payment", "Confirm"];

  return (
    <div className="flex flex-col">
      {/* Hero banner */}
      <section className="relative h-[260px] md:h-[320px] overflow-hidden">
        <Image src="/images/donate-justice.png" alt="Scales of justice with Constitution of India" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-[#C69C3F] text-xs font-medium uppercase tracking-widest mb-3">Support the cause</p>
            <h1 className="text-3xl md:text-4xl font-medium text-white leading-tight tracking-tight mb-3">
              Fund access to justice
            </h1>
            <p className="text-sm text-white/70 max-w-md mx-auto">
              Every contribution directly funds free legal representation for citizens who cannot afford to fight for their rights.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10 md:py-14">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form — 2 cols */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center gap-1 mb-8">
                    {stepLabels.map((label, i) => (
                      <div key={label} className="flex items-center gap-1 flex-1">
                        <div className={`flex items-center gap-2 flex-1 ${i < stepLabels.length - 1 ? "" : ""}`}>
                          <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-medium shrink-0 transition-colors ${
                            step > i + 1 ? "bg-[#5B8A72] text-white" : step === i + 1 ? "bg-[#1E3A5F] text-white" : "bg-[#e8e3db] text-muted-foreground"
                          }`}>
                            {step > i + 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                          </span>
                          <span className={`text-xs hidden sm:block ${step === i + 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
                        </div>
                        {i < stepLabels.length - 1 && (
                          <div className={`h-px flex-1 mx-1 ${step > i + 1 ? "bg-[#5B8A72]" : "bg-[#e8e3db]"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Card */}
                  <div className="border border-border rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 bg-muted border-b border-border">
                      <h2 className="text-base font-medium text-foreground">
                        {["Choose your contribution", "Your details", "Payment method", "Review & confirm"][step - 1]}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {[
                          "Every rupee funds access to justice",
                          form.donorType === "corporate" ? "CSR & company information" : "For your 80G tax receipt",
                          "Choose how you'd like to contribute",
                          "Review your donation before confirming",
                        ][step - 1]}
                      </p>
                    </div>

                    <div className="p-6">
                      <AnimatePresence mode="wait">
                        {/* Step 1 */}
                        {step === 1 && (
                          <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-6">
                            <div>
                              <label className="text-xs text-muted-foreground mb-2 block font-medium">I am donating as</label>
                              <div className="flex gap-3">
                                {([
                                  { id: "individual" as const, icon: User, label: "Individual", sub: "Personal donation" },
                                  { id: "corporate" as const, icon: Building2, label: "Corporate / CSR", sub: "Section 135 eligible" },
                                ] as const).map((d) => (
                                  <button key={d.id} type="button" onClick={() => set("donorType", d.id)}
                                    className={`flex-1 p-4 rounded-xl border text-left transition-all ${form.donorType === d.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-border hover:border-[#d4cfc7]"}`}>
                                    <d.icon className={`w-5 h-5 mb-2 ${form.donorType === d.id ? "text-[#1E3A5F]" : "text-[#d4cfc7]"}`} />
                                    <p className={`text-sm font-medium ${form.donorType === d.id ? "text-[#1E3A5F]" : "text-foreground"}`}>{d.label}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{d.sub}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-2 block font-medium">Frequency</label>
                              <div className="flex gap-2">
                                {([{ id: "onetime" as const, label: "One-time" }, { id: "monthly" as const, label: "Monthly" }] as const).map((f) => (
                                  <button key={f.id} type="button" onClick={() => set("frequency", f.id)}
                                    className={`flex-1 h-11 rounded-lg text-sm border transition-all ${form.frequency === f.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-border text-muted-foreground"}`}>
                                    {f.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-2 block font-medium">Select an amount</label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                                {presetAmounts.map((a) => (
                                  <button key={a.value} type="button" onClick={() => { set("amount", a.value); set("customAmount", ""); }}
                                    className={`p-3 rounded-lg border text-left transition-all ${form.amount === a.value && !form.customAmount ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-border hover:border-[#d4cfc7]"}`}>
                                    <p className={`text-sm font-medium ${form.amount === a.value && !form.customAmount ? "text-[#1E3A5F]" : "text-foreground"}`}>{a.label}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.impact}</p>
                                  </button>
                                ))}
                              </div>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                                <Input type="number" min="100" value={form.customAmount}
                                  onChange={(e) => { set("customAmount", e.target.value); set("amount", 0); }}
                                  placeholder="Or enter a custom amount" className="bg-background border-border text-sm h-11 rounded-lg pl-7" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                          <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
                            <div>
                              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Full name *</label>
                              <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Enter your full name" className="bg-background border-border text-sm h-11 rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email *</label>
                                <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" className="bg-background border-border text-sm h-11 rounded-lg" />
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Phone *</label>
                                <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className="bg-background border-border text-sm h-11 rounded-lg" />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">PAN number <span className="text-[#d4cfc7]">(for 80G receipt)</span></label>
                              <Input value={form.pan} onChange={(e) => set("pan", e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} className="bg-background border-border text-sm h-11 rounded-lg uppercase" />
                            </div>
                            {form.donorType === "corporate" && (
                              <div className="pt-3 border-t border-border space-y-4">
                                <p className="text-xs text-[#C69C3F] font-medium">CSR Details</p>
                                <div>
                                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Company name *</label>
                                  <Input value={form.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Company registered name" className="bg-background border-border text-sm h-11 rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">CIN number</label>
                                    <Input value={form.cinNumber} onChange={(e) => set("cinNumber", e.target.value)} placeholder="U12345DL2020PTC123456" className="bg-background border-border text-sm h-11 rounded-lg" />
                                  </div>
                                  <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">CSR contact person</label>
                                    <Input value={form.csrContact} onChange={(e) => set("csrContact", e.target.value)} placeholder="Name of CSR head" className="bg-background border-border text-sm h-11 rounded-lg" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                          <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                            <div className="space-y-3">
                              <button type="button" onClick={() => set("paymentMethod", "upi")}
                                className={`w-full p-4 rounded-xl border text-left transition-all ${form.paymentMethod === "upi" ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-border hover:border-[#d4cfc7]"}`}>
                                <p className={`text-sm font-medium ${form.paymentMethod === "upi" ? "text-[#1E3A5F]" : "text-foreground"}`}>UPI Transfer</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">Pay via Google Pay, PhonePe, Paytm, or any UPI app</p>
                              </button>
                              <button type="button" onClick={() => set("paymentMethod", "bank")}
                                className={`w-full p-4 rounded-xl border text-left transition-all ${form.paymentMethod === "bank" ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-border hover:border-[#d4cfc7]"}`}>
                                <p className={`text-sm font-medium ${form.paymentMethod === "bank" ? "text-[#1E3A5F]" : "text-foreground"}`}>Bank Transfer (NEFT / RTGS / IMPS)</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">Direct transfer to our registered bank account</p>
                              </button>
                            </div>
                            {form.paymentMethod === "upi" && (
                              <div className="border border-border rounded-xl p-4 space-y-3">
                                <p className="text-xs text-muted-foreground font-medium">UPI ID</p>
                                <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                                  <span className="text-sm font-medium text-foreground">donate@ipbli.org</span>
                                  <button onClick={() => handleCopy("donate@ipbli.org", "upi")} className="text-[#1E3A5F] hover:text-[#2B5278]">
                                    {copied === "upi" ? <Check className="w-4 h-4 text-[#5B8A72]" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                </div>
                                <p className="text-[11px] text-muted-foreground">Copy the UPI ID and pay ₹{selectedAmount.toLocaleString("en-IN")} from your preferred app.</p>
                              </div>
                            )}
                            {form.paymentMethod === "bank" && (
                              <div className="border border-border rounded-xl p-4 space-y-2">
                                <p className="text-xs text-muted-foreground font-medium mb-2">Bank account details</p>
                                {[
                                  { label: "Account Name", value: "IPBLI Foundation" },
                                  { label: "Account Number", value: "920020043215678" },
                                  { label: "IFSC Code", value: "UTIB0001234" },
                                  { label: "Bank", value: "Axis Bank, Connaught Place, New Delhi" },
                                  { label: "Account Type", value: "Current Account" },
                                ].map((row) => (
                                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                    <div>
                                      <p className="text-[11px] text-muted-foreground">{row.label}</p>
                                      <p className="text-sm text-foreground font-medium">{row.value}</p>
                                    </div>
                                    <button onClick={() => handleCopy(row.value, row.label)} className="text-[#1E3A5F] hover:text-[#2B5278]">
                                      {copied === row.label ? <Check className="w-3.5 h-3.5 text-[#5B8A72]" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Step 4 */}
                        {step === 4 && (
                          <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                            <div className="border border-border rounded-xl divide-y divide-[#e8e3db] text-sm">
                              {[
                                { label: "Donor type", value: form.donorType === "corporate" ? `Corporate — ${form.companyName}` : "Individual" },
                                { label: "Frequency", value: form.frequency === "monthly" ? "Monthly recurring" : "One-time" },
                                { label: "Amount", value: `₹${selectedAmount.toLocaleString("en-IN")}` },
                                { label: "Name", value: form.fullName },
                                { label: "Email", value: form.email },
                                ...(form.pan ? [{ label: "PAN", value: form.pan }] : []),
                                { label: "Payment", value: form.paymentMethod === "upi" ? "UPI Transfer" : "Bank Transfer" },
                              ].map((row) => (
                                <div key={row.label} className="flex justify-between px-4 py-3">
                                  <span className="text-muted-foreground">{row.label}</span>
                                  <span className="text-foreground font-medium text-right">{row.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="bg-[#C69C3F]/10 border border-[#C69C3F]/20 p-4 rounded-xl">
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-medium">80G Tax Benefit: </span>
                                Your donation is eligible for tax deduction under Section 80G. An 80G receipt will be emailed to <span className="text-foreground font-medium">{form.email}</span> within 24 hours.
                              </p>
                            </div>
                            {form.donorType === "corporate" && (
                              <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 p-4 rounded-xl">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  <span className="text-foreground font-medium">CSR Compliance: </span>
                                  IPBLI qualifies under Schedule VII (item iii) for CSR activities. A formal acknowledgment letter will be issued.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation */}
                      <div className="mt-6 pt-5 border-t border-border flex justify-between items-center">
                        {step > 1 ? (
                          <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                        ) : <div />}
                        {step < TOTAL_STEPS ? (
                          <Button onClick={() => canProceed() && setStep((s) => s + 1)} disabled={!canProceed()}
                            className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-10 px-5 shadow-none disabled:opacity-40">
                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button onClick={handleSubmit} disabled={submitting}
                            className="rounded-full bg-[#5B8A72] hover:bg-[#4a7a62] text-white text-sm h-10 px-5 shadow-none disabled:opacity-40">
                            {submitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</> : <>Confirm donation <Heart className="w-4 h-4 ml-2" /></>}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 bg-[#5B8A72]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Heart className="w-7 h-7 text-[#5B8A72]" />
                  </div>
                  <h2 className="text-xl font-medium text-foreground mb-2">Thank you, {form.fullName.split(" ")[0]}</h2>
                  <p className="text-sm text-muted-foreground mb-2 max-w-sm mx-auto">
                    Your {form.frequency === "monthly" ? "monthly " : ""}donation of <span className="text-foreground font-medium">₹{selectedAmount.toLocaleString("en-IN")}</span> will directly fund free legal representation for citizens who cannot afford justice.
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    An 80G receipt will be emailed to <span className="text-foreground font-medium">{form.email}</span> within 24 hours.
                  </p>
                  <div className="inline-block bg-muted border border-border rounded-xl p-4 mb-6 text-left">
                    <p className="text-[11px] text-muted-foreground mb-1">Donation Reference</p>
                    <p className="text-lg font-medium text-[#1E3A5F]">DON-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Mention this reference when making the transfer.</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Link href="/">
                      <Button className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-10 px-5 shadow-none">
                        Return home <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              {/* Fund allocation */}
              <div className="border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-foreground mb-4">Where your money goes</h3>
                <div className="space-y-3">
                  {fundAllocation.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="border border-border rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-medium text-foreground mb-1">Tax & compliance</h3>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#C69C3F] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">80G Tax Exemption</p>
                    <p className="text-[11px] text-muted-foreground">Donations are eligible for tax deduction under Section 80G of the IT Act</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Receipt className="w-4 h-4 text-[#C69C3F] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">12A Registered</p>
                    <p className="text-[11px] text-muted-foreground">Registered non-profit under Section 12A</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#C69C3F] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">CSR Eligible</p>
                    <p className="text-[11px] text-muted-foreground">Qualifies under Schedule VII, Companies Act 2013</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border border-border rounded-xl p-5">
                <h3 className="text-sm font-medium text-foreground mb-2">Need help?</h3>
                <p className="text-xs text-muted-foreground mb-3">For CSR partnerships or large donations, reach out directly.</p>
                <Link href="/contact" className="text-xs text-[#1E3A5F] hover:underline font-medium">
                  Contact our team →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
