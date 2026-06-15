"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="flex flex-col">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#5B8A72] text-white text-sm px-5 py-3 rounded-full flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" /> Message sent successfully
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs text-[#1E3A5F] font-medium uppercase tracking-wider mb-3">Contact</p>
          <h1 className="text-3xl md:text-4xl font-medium text-[#1A1A2E] leading-tight tracking-tight mb-5">
            Get in touch
          </h1>
          <p className="text-base text-[#6B7280]">
            For partnerships, institutional grants, media inquiries, or general questions about IPBLI.
          </p>
        </div>
      </section>

      <div className="border-t border-[#e8e3db]" />

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-[#1E3A5F]/8 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">Email</p>
                  <a href="mailto:care@ipbli.org" className="text-sm text-[#1E3A5F] hover:underline">care@ipbli.org</a>
                  <p className="text-xs text-[#6B7280] mt-0.5">Response within 48–72 hours</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 bg-[#C75B39]/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C75B39]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">Registered Office</p>
                  <p className="text-sm text-[#6B7280]">IPBLI Foundation, New Delhi, India</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 bg-[#C69C3F]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C69C3F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">Phone</p>
                  <a href="tel:+919876543210" className="text-sm text-[#1E3A5F] hover:underline">+91 98765 43210</a>
                  <p className="text-xs text-[#6B7280] mt-0.5">Mon-Fri, 10 AM to 5 PM</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="border border-[#e8e3db] rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#6B7280] mb-1 block">Name *</label>
                      <Input required className="bg-white border-[#e8e3db] text-sm h-10 rounded-lg" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-xs text-[#6B7280] mb-1 block">Email *</label>
                      <Input required type="email" className="bg-white border-[#e8e3db] text-sm h-10 rounded-lg" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">Subject *</label>
                    <Input required className="bg-white border-[#e8e3db] text-sm h-10 rounded-lg" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">Message *</label>
                    <Textarea required className="bg-white border-[#e8e3db] text-sm rounded-lg resize-none h-28" placeholder="Tell us about your inquiry..." />
                  </div>
                  <Button type="submit" className="rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-10 px-6 shadow-none">
                    Send message
                  </Button>
                </form>
              ) : (
                <div className="border border-[#e8e3db] rounded-xl p-10 text-center">
                  <div className="w-10 h-10 bg-[#5B8A72]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5B8A72]" />
                  </div>
                  <p className="text-sm font-medium text-[#1A1A2E] mb-1">Message sent</p>
                  <p className="text-xs text-[#6B7280]">We&apos;ll respond within 48–72 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-[#1E3A5F] hover:underline mt-4 inline-block">
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
