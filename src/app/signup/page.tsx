"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<"citizen" | "advocate">("citizen");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const roles = [
    { id: "citizen" as const, label: "Citizen", desc: "I need legal assistance" },
    { id: "advocate" as const, label: "Advocate", desc: "I want to provide pro bono representation" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left — Image + Quote */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/auth-court.png"
          alt="Supreme Court of India at dusk"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/40 to-[#1A1A2E]/20" />

        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="text-white/95 text-xl md:text-2xl leading-relaxed font-light italic mb-4">
            &ldquo;Bail is the rule, jail is the exception. Deprivation of liberty must be an exception and not the rule.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-[#C69C3F]" />
            <div>
              <p className="text-[#C69C3F] text-sm font-medium">Justice V.R. Krishna Iyer</p>
              <p className="text-white/50 text-xs">Supreme Court of India</p>
            </div>
          </div>
        </div>

        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Scale className="w-4 h-4 text-[#C69C3F]" />
          </div>
          <span className="text-white/90 font-medium text-sm tracking-tight">NyayaSetu</span>
        </Link>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="lg:hidden ns-bar" />
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#e8e3db]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1E3A5F] flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-[#C69C3F]" />
            </div>
            <span className="font-medium text-sm text-[#1A1A2E]">NyayaSetu</span>
          </Link>
          <Link href="/" className="text-xs text-[#6B7280] hover:text-[#1A1A2E]">← Back to home</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">
            {!success ? (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-medium text-[#1A1A2E] mb-2">Create your account</h1>
                  <p className="text-sm text-[#6B7280]">
                    Join NyayaSetu to access free legal representation.
                  </p>
                </div>

                {/* Role selector */}
                <div className="flex gap-2 mb-6">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex-1 text-left p-3 rounded-xl border transition-all duration-200 ${
                        role === r.id
                          ? "border-[#1E3A5F] bg-[#1E3A5F]/5"
                          : "border-[#e8e3db] hover:border-[#d4cfc7]"
                      }`}
                    >
                      <p className={`text-xs font-medium ${role === r.id ? "text-[#1E3A5F]" : "text-[#1A1A2E]"}`}>{r.label}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{r.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Full name *</label>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                  </div>

                  <div>
                    <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Email address *</label>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                  </div>

                  <div>
                    <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Phone number</label>
                    <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                  </div>

                  <div>
                    <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Password *</label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A2E]">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Confirm password *</label>
                    <Input type="password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)}
                      placeholder="Re-enter your password"
                      className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg" />
                  </div>

                  {error && (
                    <p className="text-xs text-[#C75B39] bg-[#C75B39]/8 px-3 py-2 rounded-lg">{error}</p>
                  )}

                  <div className="pt-1">
                    <Button type="submit" disabled={loading}
                      className="w-full rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 text-sm shadow-none disabled:opacity-70">
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating account...</>
                      ) : (
                        <>Create account <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </div>

                  <p className="text-[11px] text-[#6B7280] text-center leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-[#1E3A5F] hover:underline">Terms</Link>{" "}and{" "}
                    <Link href="/privacy" className="text-[#1E3A5F] hover:underline">Privacy Policy</Link>.
                  </p>
                </form>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e8e3db]" /></div>
                  <div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-[#6B7280]">or</span></div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-[#6B7280]">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-[#1E3A5F] font-medium hover:underline">Sign in</Link>
                  </p>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-[#5B8A72]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-[#5B8A72]" />
                </div>
                <h2 className="text-xl font-medium text-[#1A1A2E] mb-2">Account created</h2>
                <p className="text-sm text-[#6B7280] mb-8 max-w-xs mx-auto">
                  Welcome to NyayaSetu, <span className="text-[#1A1A2E] font-medium">{form.name}</span>. You can now sign in and {role === "citizen" ? "apply for legal assistance" : "join our pro bono panel"}.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/signin">
                    <Button className="w-full rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 text-sm shadow-none">
                      Continue to sign in <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/" className="text-xs text-[#6B7280] hover:text-[#1A1A2E]">
                    ← Back to home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
