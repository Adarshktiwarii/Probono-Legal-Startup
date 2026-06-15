"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scale, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"citizen" | "advocate" | "admin">("citizen");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulated auth — in production, this would call an API
    setTimeout(() => {
      setLoading(false);
      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "advocate") router.push("/advocate/cases");
      else router.push("/apply");
    }, 800);
  };

  const roles = [
    { id: "citizen" as const, label: "Citizen", desc: "Apply for legal aid" },
    { id: "advocate" as const, label: "Advocate", desc: "Manage pro bono cases" },
    { id: "admin" as const, label: "Admin", desc: "Operations dashboard" },
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

        {/* Quote overlay */}
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

        {/* IPBLI branding */}
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Scale className="w-4 h-4 text-[#C69C3F]" />
          </div>
          <span className="text-white/90 font-medium text-sm tracking-tight">IPBLI</span>
        </Link>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden ns-bar" />
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#e8e3db]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1E3A5F] flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-[#C69C3F]" />
            </div>
            <span className="font-medium text-sm text-[#1A1A2E]">IPBLI</span>
          </Link>
          <Link href="/" className="text-xs text-[#6B7280] hover:text-[#1A1A2E]">
            ← Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-medium text-[#1A1A2E] mb-2">Welcome back</h1>
              <p className="text-sm text-[#6B7280]">
                Sign in to your IPBLI account to continue.
              </p>
            </div>

            {/* Role selector */}
            <div className="flex gap-1 p-1 bg-[#F9F7F4] rounded-full mb-6 border border-[#e8e3db]">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 text-xs py-2 rounded-full transition-all duration-200 ${
                    role === r.id
                      ? "bg-[#1E3A5F] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#1A1A2E]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#C69C3F] mb-6 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#C69C3F]" />
              {roles.find((r) => r.id === role)?.desc}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Email address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg focus:border-[#1E3A5F] focus:ring-[#1E3A5F]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs text-[#6B7280] font-medium">Password</label>
                  <button type="button" className="text-[11px] text-[#1E3A5F] hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-white border-[#e8e3db] text-sm h-11 rounded-lg pr-10 focus:border-[#1E3A5F] focus:ring-[#1E3A5F]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A2E]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-[#C75B39] bg-[#C75B39]/8 px-3 py-2 rounded-lg">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white h-11 text-sm shadow-none disabled:opacity-70"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Signing in...</>
                ) : (
                  <>Sign in <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e8e3db]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-[#6B7280]">or</span></div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-sm text-[#6B7280]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#1E3A5F] font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>

            {/* Demo badge */}
            <div className="mt-8 pt-6 border-t border-[#e8e3db] text-center">
              <span className="text-[10px] text-[#C69C3F] bg-[#C69C3F]/10 px-3 py-1 rounded-full border border-[#C69C3F]/15">
                Demo Mode — Use any email and password to explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
