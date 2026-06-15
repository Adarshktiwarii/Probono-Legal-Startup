"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Scale, ArrowRight, ArrowLeft, CheckCircle2, Loader2, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 5;

const caseTypes = [
  { id: "fundamental_rights", label: "Fundamental Rights Violation" },
  { id: "wrongful_arrest", label: "Wrongful Arrest / Illegal Detention" },
  { id: "bail", label: "Bail Assistance" },
  { id: "senior_abuse", label: "Senior Citizen Abuse / Eviction" },
  { id: "criminal_intimidation", label: "Criminal Intimidation / Threats" },
  { id: "false_case", label: "False / Frivolous Criminal Case" },
  { id: "other", label: "Other" },
];

const incomeRanges = [
  { id: "below_1l", label: "Below ₹1,00,000" },
  { id: "1l_3l", label: "₹1,00,000 – ₹3,00,000" },
  { id: "3l_5l", label: "₹3,00,000 – ₹5,00,000" },
  { id: "above_5l", label: "Above ₹5,00,000" },
];

const caseStages = [
  { id: "fresh", label: "Fresh matter — no case filed yet" },
  { id: "fir_filed", label: "FIR has been filed" },
  { id: "trial", label: "Case is at trial stage" },
  { id: "appeal", label: "Want to challenge / appeal an order" },
  { id: "not_sure", label: "I'm not sure" },
];

const states = [
  { id: "dl", label: "Delhi NCR" },
  { id: "mp", label: "Madhya Pradesh" },
];

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "", age: "", gender: "", phone: "", email: "",
    state: "", city: "", caseType: "", caseStage: "",
    caseDescription: "", hasLawyer: "", hearingDate: "",
    income: "", dependents: "", consent: false,
  });

  const set = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!(form.fullName && form.age && form.gender && form.phone);
      case 2: return !!(form.state && form.city);
      case 3: return !!(form.caseType && form.caseStage && form.caseDescription);
      case 4: return !!(form.income);
      case 5: return form.consent;
      default: return false;
    }
  };

  const handleSubmit = () => {
    if (!form.consent) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const stepMeta = [
    { num: 1, label: "About you", sub: "Let's start with your basic details" },
    { num: 2, label: "Your location", sub: "Where are you based?" },
    { num: 3, label: "Your case", sub: "Tell us what happened — in your own words" },
    { num: 4, label: "Financial situation", sub: "This helps us assess eligibility" },
    { num: 5, label: "Review & submit", sub: "Almost done — just confirm and submit" },
  ];

  const current = stepMeta[step - 1];

  return (
    <div className="min-h-screen flex">
      {/* Left — Image + context */}
      <div className="hidden lg:flex lg:w-[40%] relative flex-col shrink-0">
        <Image src="/images/delhi-high-court.png" alt="Delhi High Court at golden hour" fill sizes="40vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/50 to-[#1A1A2E]/30" />

        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2.5 group z-10">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Scale className="w-4 h-4 text-[#C69C3F]" />
          </div>
          <span className="text-white/90 font-medium text-sm">IPBLI</span>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex gap-1.5 mb-3">
              {stepMeta.map((s) => (
                <div key={s.num} className={`h-1 flex-1 rounded-full transition-colors ${step >= s.num ? "bg-[#C69C3F]" : "bg-white/20"}`} />
              ))}
            </div>
            <p className="text-white/60 text-xs">Step {step} of {TOTAL_STEPS}</p>
          </div>

          {/* What happens next */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5 mb-5">
            <h3 className="text-white/90 text-sm font-medium mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C69C3F]" /> What happens next?
            </h3>
            <ol className="space-y-2 text-xs text-white/60">
              <li className="flex gap-2"><span className="text-[#C69C3F]">1.</span> Your application is manually reviewed</li>
              <li className="flex gap-2"><span className="text-[#C69C3F]">2.</span> We verify financial eligibility</li>
              <li className="flex gap-2"><span className="text-[#C69C3F]">3.</span> A qualified advocate is assigned</li>
              <li className="flex gap-2"><span className="text-[#C69C3F]">4.</span> You receive a call within 3–5 days</li>
            </ol>
          </div>

          <div className="flex items-center gap-2 text-white/40 text-[11px]">
            <Lock className="w-3 h-3" /> Protected by attorney-client privilege
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden ns-bar" />
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#e8e3db]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1E3A5F] flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-[#C69C3F]" />
            </div>
            <span className="font-medium text-sm text-[#1A1A2E]">IPBLI</span>
          </Link>
          <span className="text-xs text-[#6B7280]">Step {step}/{TOTAL_STEPS}</span>
        </div>

        {/* Mobile progress */}
        <div className="lg:hidden px-6 pt-4">
          <div className="flex gap-1">
            {stepMeta.map((s) => (
              <div key={s.num} className={`h-1 flex-1 rounded-full ${step >= s.num ? "bg-[#1E3A5F]" : "bg-[#e8e3db]"}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto">
          <div className="w-full max-w-lg">
            {!submitted ? (
              <>
                {/* Step header */}
                <div className="mb-8">
                  <p className="text-xs text-[#C69C3F] font-medium uppercase tracking-wider mb-2">Step {current.num}</p>
                  <h1 className="text-2xl font-medium text-[#1A1A2E] mb-1">{current.label}</h1>
                  <p className="text-sm text-[#6B7280]">{current.sub}</p>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1: About you */}
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Full name *</label>
                        <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Enter your full name" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Age *</label>
                          <Input type="number" min="1" max="120" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 35" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Gender *</label>
                          <div className="flex gap-2">
                            {["Male", "Female", "Other"].map((g) => (
                              <button key={g} type="button" onClick={() => set("gender", g)}
                                className={`flex-1 h-11 rounded-lg text-xs border transition-all ${form.gender === g ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-[#e8e3db] text-[#6B7280] hover:border-[#d4cfc7]"}`}>
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Phone number *</label>
                          <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Email <span className="text-[#d4cfc7]">(optional)</span></label>
                          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Location */}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-[#6B7280] mb-2 block font-medium">Which state are you in? *</label>
                        <div className="flex gap-3">
                          {states.map((s) => (
                            <button key={s.id} type="button" onClick={() => set("state", s.id)}
                              className={`flex-1 p-4 rounded-xl border text-center transition-all ${form.state === s.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5" : "border-[#e8e3db] hover:border-[#d4cfc7]"}`}>
                              <p className={`text-sm font-medium ${form.state === s.id ? "text-[#1E3A5F]" : "text-[#1A1A2E]"}`}>{s.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">City / District *</label>
                        <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. South Delhi, Bhopal, Jabalpur" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Case details */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div>
                        <label className="text-xs text-[#6B7280] mb-2 block font-medium">What kind of case is this? *</label>
                        <div className="grid grid-cols-2 gap-2">
                          {caseTypes.map((c) => (
                            <button key={c.id} type="button" onClick={() => set("caseType", c.id)}
                              className={`text-left p-3 rounded-lg border text-xs transition-all ${form.caseType === c.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-[#e8e3db] text-[#6B7280] hover:border-[#d4cfc7]"}`}>
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#6B7280] mb-2 block font-medium">What stage is this case at? *</label>
                        <div className="space-y-2">
                          {caseStages.map((s) => (
                            <button key={s.id} type="button" onClick={() => set("caseStage", s.id)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${form.caseStage === s.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-[#e8e3db] text-[#6B7280] hover:border-[#d4cfc7]"}`}>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Tell us what happened *</label>
                        <p className="text-[11px] text-[#d4cfc7] mb-2">Write freely in your own words. No legal language needed.</p>
                        <Textarea value={form.caseDescription} onChange={(e) => set("caseDescription", e.target.value)}
                          placeholder="Describe your situation — what happened, when, and what help you need..."
                          className="bg-white border-[#e8e3db] text-sm rounded-lg resize-none h-28" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#6B7280] mb-2 block font-medium">Do you have a lawyer currently?</label>
                          <div className="flex gap-2">
                            {["No", "Yes"].map((v) => (
                              <button key={v} type="button" onClick={() => set("hasLawyer", v)}
                                className={`flex-1 h-10 rounded-lg text-xs border transition-all ${form.hasLawyer === v ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-[#e8e3db] text-[#6B7280]"}`}>
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Next hearing date <span className="text-[#d4cfc7]">(if any)</span></label>
                          <Input type="date" value={form.hearingDate} onChange={(e) => set("hearingDate", e.target.value)} className="bg-white border-[#e8e3db] text-sm h-10 rounded-lg" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Financial */}
                  {step === 4 && (
                    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div>
                        <label className="text-xs text-[#6B7280] mb-2 block font-medium">Annual household income *</label>
                        <div className="space-y-2">
                          {incomeRanges.map((r) => (
                            <button key={r.id} type="button" onClick={() => set("income", r.id)}
                              className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all ${form.income === r.id ? "border-[#1E3A5F] bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium" : "border-[#e8e3db] text-[#6B7280] hover:border-[#d4cfc7]"}`}>
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Number of dependents</label>
                        <Input type="number" min="0" value={form.dependents} onChange={(e) => set("dependents", e.target.value)} placeholder="e.g. 3" className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg max-w-[120px]" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Review & Submit */}
                  {step === 5 && (
                    <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <div className="border border-[#e8e3db] rounded-xl divide-y divide-[#e8e3db] text-sm">
                        {[
                          { label: "Name", value: form.fullName },
                          { label: "Age / Gender", value: `${form.age} yrs, ${form.gender}` },
                          { label: "Phone", value: form.phone },
                          { label: "Location", value: `${form.city}, ${states.find(s => s.id === form.state)?.label || form.state}` },
                          { label: "Case type", value: caseTypes.find(c => c.id === form.caseType)?.label || form.caseType },
                          { label: "Stage", value: caseStages.find(s => s.id === form.caseStage)?.label || form.caseStage },
                          { label: "Income", value: incomeRanges.find(r => r.id === form.income)?.label || form.income },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between px-4 py-3">
                            <span className="text-[#6B7280]">{row.label}</span>
                            <span className="text-[#1A1A2E] font-medium text-right">{row.value}</span>
                          </div>
                        ))}
                      </div>

                      {form.caseDescription && (
                        <div className="border border-[#e8e3db] rounded-xl p-4">
                          <p className="text-xs text-[#6B7280] mb-1">Your description</p>
                          <p className="text-sm text-[#1A1A2E] leading-relaxed">{form.caseDescription}</p>
                        </div>
                      )}

                      <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 p-4 rounded-xl">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-[#e8e3db] text-[#1E3A5F] focus:ring-[#1E3A5F]" />
                          <span className="text-xs text-[#6B7280] leading-relaxed">
                            I declare that all information provided is true and accurate. I understand that misrepresentation of financial status will result in immediate termination of legal aid services.
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  {step > 1 ? (
                    <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <Link href="/" className="text-sm text-[#6B7280] hover:text-[#1A1A2E]">← Home</Link>
                  )}

                  {step < TOTAL_STEPS ? (
                    <Button onClick={() => canProceed() && setStep((s) => s + 1)} disabled={!canProceed()}
                      className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-11 px-6 shadow-none disabled:opacity-40">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!form.consent || submitting}
                      className="rounded-full bg-[#5B8A72] hover:bg-[#4a7a62] text-white text-sm h-11 px-6 shadow-none disabled:opacity-40">
                      {submitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...</> : <>Submit application <CheckCircle2 className="w-4 h-4 ml-2" /></>}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Success */
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <div className="w-16 h-16 bg-[#5B8A72]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#5B8A72]" />
                </div>
                <h2 className="text-2xl font-medium text-[#1A1A2E] mb-2">Application received</h2>
                <p className="text-sm text-[#6B7280] mb-3 max-w-sm mx-auto">
                  Thank you, <span className="text-[#1A1A2E] font-medium">{form.fullName}</span>. Your case has been registered with our operations team.
                </p>
                <p className="text-xs text-[#6B7280] mb-8 max-w-sm mx-auto">
                  You will receive an SMS on <span className="text-[#1A1A2E] font-medium">{form.phone}</span> within 3–5 business days with your case status and next steps.
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <Button onClick={() => router.push("/")} className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 px-7 text-sm shadow-none">
                    Return home <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <span className="text-[10px] text-[#C69C3F] bg-[#C69C3F]/10 px-3 py-1 rounded-full border border-[#C69C3F]/15">
                    Case Ref: NYA-2026-{String(Math.floor(Math.random() * 9000) + 1000)}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
