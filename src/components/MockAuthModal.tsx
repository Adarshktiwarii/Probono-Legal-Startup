"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Users, UserCheck, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

interface MockAuthModalProps { isOpen: boolean; onClose: () => void; }

export function MockAuthModal({ isOpen, onClose }: MockAuthModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: "ADMIN" | "ADVOCATE" | "BENEFICIARY") => {
    setLoading(true);
    setTimeout(() => {
      onClose(); setLoading(false);
      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "ADVOCATE") router.push("/advocate/cases");
      else router.push("/apply");
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1A2E]/20 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] bg-white border border-[#e8e3db] rounded-2xl p-6">
            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 text-[#6B7280] hover:text-[#1A1A2E] hover:bg-[#F9F7F4] rounded-full transition-colors" aria-label="Close">
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-9 h-9 bg-[#1E3A5F] rounded-lg flex items-center justify-center mx-auto mb-3">
                <Scale className="w-4 h-4 text-[#C69C3F]" />
              </div>
              <h2 className="text-base font-medium text-[#1A1A2E]">Sign in to NyayaSetu</h2>
              <p className="text-xs text-[#6B7280] mt-1">Choose a role to explore the platform</p>
              <span className="inline-block text-[10px] text-[#C69C3F] bg-[#C69C3F]/10 px-2 py-0.5 rounded-full mt-2 border border-[#C69C3F]/20">Demo Mode</span>
            </div>

            {!loading ? (
              <div className="space-y-2">
                <button onClick={() => handleLogin("ADMIN")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#e8e3db] hover:bg-[#F9F7F4] transition-colors text-left">
                  <div className="w-8 h-8 bg-[#C75B39]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-3.5 w-3.5 text-[#C75B39]" />
                  </div>
                  <div><p className="text-sm font-medium text-[#1A1A2E]">Admin</p><p className="text-[11px] text-[#6B7280]">Operations dashboard</p></div>
                </button>
                <button onClick={() => handleLogin("ADVOCATE")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#e8e3db] hover:bg-[#F9F7F4] transition-colors text-left">
                  <div className="w-8 h-8 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 text-[#1E3A5F]" />
                  </div>
                  <div><p className="text-sm font-medium text-[#1A1A2E]">Advocate</p><p className="text-[11px] text-[#6B7280]">Manage pro bono cases</p></div>
                </button>
                <button onClick={() => handleLogin("BENEFICIARY")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#e8e3db] hover:bg-[#F9F7F4] transition-colors text-left">
                  <div className="w-8 h-8 bg-[#5B8A72]/10 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-3.5 w-3.5 text-[#5B8A72]" />
                  </div>
                  <div><p className="text-sm font-medium text-[#1A1A2E]">Citizen</p><p className="text-[11px] text-[#6B7280]">Apply or track your case</p></div>
                </button>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center">
                <div className="h-7 w-7 rounded-full border-[3px] border-[#1E3A5F] border-t-transparent animate-spin mb-3" />
                <p className="text-xs text-[#6B7280]">Signing in...</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
