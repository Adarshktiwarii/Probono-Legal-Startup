"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, UploadCloud, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  dob: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(10, "Please provide your full address"),
  state: z.string().min(1, "Required"),
  pincode: z.string().min(6, "Enter a valid 6-digit pincode"),
  annualIncome: z.string().min(1, "Required"),
  dependents: z.string().min(1, "Required"),
  caseCategory: z.string().min(1, "Required"),
  caseTitle: z.string().min(5, "Please provide a brief title"),
  caseDescription: z.string().min(20, "Please provide more detail"),
  consentTrue: z.boolean().refine(val => val === true, "You must agree"),
});

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", dob: "", gender: "",
      phone: "", email: "", address: "", state: "", pincode: "",
      annualIncome: "", dependents: "0",
      caseCategory: "", caseTitle: "", caseDescription: "",
      consentTrue: false,
    },
    mode: "onChange",
  });

  const onSubmit = () => setIsSubmitted(true);

  const nextStep = async () => {
    const fields: Record<number, string[]> = {
      1: ["firstName", "lastName", "dob", "gender"],
      2: ["phone", "email", "address", "state", "pincode"],
      3: ["annualIncome", "dependents"],
      4: ["caseCategory", "caseTitle", "caseDescription"],
      5: [],
      6: ["consentTrue"],
    };
    const isValid = await form.trigger(fields[step] as any);
    if (isValid) setStep(s => Math.min(s + 1, 6));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (isSubmitted) {
    return (
      <div className="border border-[#e8e3db] rounded-xl p-10 text-center">
        <div className="w-12 h-12 bg-[#5B8A72]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#5B8A72]" />
        </div>
        <h2 className="text-xl font-medium text-[#1A1A2E] mb-2">Application received</h2>
        <p className="text-sm text-[#6B7280] mb-6 max-w-sm mx-auto">
          Our operations team will review your application within 3–5 business days. You will receive an SMS with your status.
        </p>
        <Button className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm px-6 h-9 shadow-none" onClick={() => window.location.href = "/"}>
          Return home
        </Button>
      </div>
    );
  }

  const steps = ["Personal", "Contact", "Financial", "Case", "Documents", "Review"];
  const stepColors = ["#1E3A5F", "#C75B39", "#C69C3F", "#5B8A72", "#1E3A5F", "#C75B39"];
  const stepIdx = step - 1;

  const inputClass = "bg-white border-[#e8e3db] text-[#1A1A2E] text-sm h-10 rounded-lg focus:ring-[#1E3A5F] focus:border-[#1E3A5F]";
  const labelClass = "text-sm text-[#6B7280]";

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <span key={i} className={`text-xs ${stepIdx >= i ? 'text-[#1E3A5F]' : 'text-[#d4cfc7]'}`}>{s}</span>
          ))}
        </div>
        <div className="h-1 bg-[#F5F3EE] rounded-full overflow-hidden">
          <div className="h-full bg-[#1E3A5F] transition-all duration-300" style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="border border-[#e8e3db] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e8e3db] bg-[#F9F7F4]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-medium" style={{ background: stepColors[stepIdx] }}>{step}</span>
            <h3 className="text-sm font-medium text-[#1A1A2E]">{steps[stepIdx]}</h3>
          </div>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>First name</FormLabel><FormControl><Input className={inputClass} placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Last name</FormLabel><FormControl><Input className={inputClass} placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="dob" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Date of birth</FormLabel><FormControl><Input type="date" className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className={labelClass}>Phone</FormLabel><FormControl><Input className={inputClass} placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className={labelClass}>Email (optional)</FormLabel><FormControl><Input className={inputClass} placeholder="john@email.com" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Full address</FormLabel><FormControl><Textarea className="bg-white border-[#e8e3db] text-[#1A1A2E] text-sm rounded-lg resize-none h-20" placeholder="House No, Street, Locality..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="state" render={({ field }) => (
                        <FormItem><FormLabel className={labelClass}>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="dl">Delhi NCR</SelectItem><SelectItem value="mp">Madhya Pradesh</SelectItem></SelectContent>
                          </Select><FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="pincode" render={({ field }) => (
                        <FormItem><FormLabel className={labelClass}>Pincode</FormLabel><FormControl><Input className={inputClass} placeholder="110001" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <FormField control={form.control} name="annualIncome" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Annual household income (₹)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="under_1l">Below ₹1,00,000</SelectItem><SelectItem value="1l_3l">₹1,00,000 – ₹3,00,000</SelectItem><SelectItem value="above_3l">Above ₹3,00,000</SelectItem></SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dependents" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Number of dependents</FormLabel><FormControl><Input type="number" min="0" className={inputClass} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <FormField control={form.control} name="caseCategory" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="bail_assistance">Bail Assistance</SelectItem>
                            <SelectItem value="wrongful_arrest">Wrongful Arrest</SelectItem>
                            <SelectItem value="domestic_violence">Domestic Violence</SelectItem>
                            <SelectItem value="senior_protection">Senior Citizen Protection</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="caseTitle" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Brief title</FormLabel><FormControl><Input className={inputClass} placeholder="e.g. Need bail for false charge" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="caseDescription" render={({ field }) => (
                      <FormItem><FormLabel className={labelClass}>Description</FormLabel><FormControl><Textarea className="bg-white border-[#e8e3db] text-[#1A1A2E] text-sm rounded-lg resize-none h-28" placeholder="Explain what happened..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="border-2 border-dashed border-[#e8e3db] rounded-xl p-10 text-center hover:border-[#1E3A5F] transition-colors cursor-pointer">
                      <UploadCloud className="w-10 h-10 text-[#d4cfc7] mx-auto mb-3" />
                      <p className="text-sm font-medium text-[#1A1A2E] mb-1">Upload documents</p>
                      <p className="text-xs text-[#6B7280]">FIR copy, income proof, or court notices (PDF, JPG, up to 10MB)</p>
                    </div>
                  </motion.div>
                )}
                {step === 6 && (
                  <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <FormField control={form.control} name="consentTrue" render={({ field }) => (
                      <div className="bg-[#1E3A5F]/8 border border-[#1E3A5F]/15 p-5 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-0.5" />
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-[#1A1A2E]">Declaration</p>
                            <div className="flex items-start gap-3">
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                              <p className="text-xs text-[#6B7280] leading-relaxed">
                                I declare that all information provided is true. I understand that false financial information will result in termination of legal aid.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} />
                    {form.formState.errors.consentTrue && <p className="text-xs text-[#C75B39] mt-2">{form.formState.errors.consentTrue.message}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex justify-between pt-4 border-t border-[#e8e3db]">
                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}
                  className="rounded-full border-[#e8e3db] text-[#6B7280] hover:bg-gray-50 text-sm h-9 px-5 shadow-none">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                {step < 6 ? (
                  <Button type="button" onClick={nextStep}
                    className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-9 px-5 shadow-none">
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit"
                    className="rounded-full bg-[#5B8A72] hover:bg-[#2d9249] text-white text-sm h-9 px-5 shadow-none">
                    Submit <CheckCircle2 className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
