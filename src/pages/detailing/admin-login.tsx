import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, LayoutDashboard, Lock, Mail, LogIn } from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import "@/styles/detailing.css";
import { DETAILING_ADMIN_DEMO, DETAILING_BRAND } from "@/lib/detailing-demo";
import { loginDetailingAdmin, isDetailingAdminAuthed } from "@/lib/detailing-auth";

const LOGO_URL = `${import.meta.env.BASE_URL}elite-detailing-logo.webp?v=3`;

export default function DetailingAdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState(DETAILING_ADMIN_DEMO.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isDetailingAdminAuthed()) {
      setLocation(DETAILING_BRAND.adminPath);
    }
  }, [setLocation]);

  const completeLogin = () => {
    loginDetailingAdmin(DETAILING_ADMIN_DEMO.email, DETAILING_ADMIN_DEMO.name);
    setLocation(DETAILING_BRAND.adminPath);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      email.trim().toLowerCase() === DETAILING_ADMIN_DEMO.email &&
      password === DETAILING_ADMIN_DEMO.password
    ) {
      completeLogin();
      return;
    }
    setError("Invalid demo credentials. Use the owner login shown below.");
  };

  return (
    <div className="detailing-site min-h-screen bg-black text-white flex flex-col">
      <div className="texture-overlay" />
      <DetailingDisclaimer className="fixed top-0 left-0 right-0 z-[60]" />

      <header className="detail-subheader">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4 min-h-[var(--detail-nav-h)]">
          <Link
            href="/detailing"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#00EAFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <img src={LOGO_URL} alt="" aria-hidden="true" className="logo-img logo-nav logo-shine hidden sm:block" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-16 detail-page-main pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#E6007A]/20 to-[#00EAFF]/20 border border-[#00EAFF]/30 mb-4">
              <LayoutDashboard className="w-7 h-7 text-[#00EAFF]" />
            </span>
            <h1 className="text-3xl font-black italic uppercase tracking-tight mb-2">
              Owner{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] via-[#A855F7] to-[#00EAFF]">
                Login
              </span>
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Sign in to manage bookings, schedules, and client requests.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/90 backdrop-blur-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(230,0,122,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 tech-label">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00EAFF]/70" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00EAFF] focus:outline-none text-white placeholder:text-gray-600"
                    placeholder="owner@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 tech-label">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00EAFF]/70" />
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00EAFF] focus:outline-none text-white placeholder:text-gray-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {error ? (
                <p className="text-sm text-[#FF1493] font-medium" role="alert">
                  {error}
                </p>
              ) : null}

              <button type="submit" className="btn-elite-primary w-full">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 tech-label">
                Demo credentials
              </p>
              <div className="rounded-lg bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-gray-300 space-y-1 mb-4 font-mono">
                <p>
                  <span className="text-gray-500">Email:</span> {DETAILING_ADMIN_DEMO.email}
                </p>
                <p>
                  <span className="text-gray-500">Password:</span> {DETAILING_ADMIN_DEMO.password}
                </p>
              </div>
              <button type="button" onClick={completeLogin} className="btn-elite-outline w-full text-sm">
                Quick Demo Login
              </button>
            </div>
          </div>

          <DetailingDisclaimer variant="inline" className="mt-8" />
        </div>
      </main>
    </div>
  );
}
