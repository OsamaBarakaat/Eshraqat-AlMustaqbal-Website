"use client";

import React, { useState, useEffect } from "react";
import { Mail, KeyRound, CheckCircle2, X, Sparkles, Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { useClientAuth } from "@/lib/client-auth";
import { useLanguage } from "@/lib/i18n";

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ClientAuthModal({ isOpen, onClose, onSuccess }: ClientAuthModalProps) {
  const { t, dir } = useLanguage();
  const { sendOtp, verifyOtp } = useClientAuth();

  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState<string>("");
  const [countdown, setCountdown] = useState(0); // 180s = 3 minutes
  const [fallbackNotice, setFallbackNotice] = useState<{ sentTo?: string } | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [debugCode, setDebugCode] = useState<string | null>(null);

  // Countdown timer (decrements every second)
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(dir === "rtl" ? "يرجى إدخال بريد إلكتروني صحيح." : "Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    const res = await sendOtp(email.trim());
    setIsLoading(false);

    if (res.success) {
      if (res.token) {
        setOtpToken(res.token);
      }
      if (res.fallbackSent) {
        setFallbackNotice({ sentTo: res.sentTo });
      } else {
        setFallbackNotice(null);
      }
      if (res.debugOtp) {
        setDebugCode(res.debugOtp);
        setOtp(res.debugOtp);
      }
      setStep("OTP");
      setCountdown(180); // 3 minutes countdown
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!otp.trim() || otp.length < 4) {
      setErrorMessage(dir === "rtl" ? "يرجى إدخال رمز التحقق كاملاً." : "Please enter the complete verification code.");
      return;
    }

    setIsLoading(true);
    const res = await verifyOtp(email.trim(), otp.trim(), rememberMe, otpToken);
    setIsLoading(false);

    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/80 text-foreground overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {t("auth.modal_title")}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {t("auth.modal_desc")}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {debugCode && step === "OTP" && (
          <div className="p-3 mb-4 rounded-2xl text-xs bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] text-center font-mono space-y-1.5 shadow-sm">
            <span className="text-[11px] font-medium text-zinc-300 block">
              {dir === "rtl" ? "🔑 رمز التحقق السريع لتسجيل الدخول:" : "🔑 Instant Verification Code:"}
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-black text-[#F3E5AB] tracking-widest bg-black/40 px-3 py-1 rounded-lg border border-[#C5A059]/30">
                {debugCode}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              {dir === "rtl" ? "تم تعبئة الرمز تلقائياً لراحتك. اضغط تأكيد الدخول أدناه." : "The code was automatically filled for you. Click Confirm below."}
            </p>
          </div>
        )}

        {step === "EMAIL" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                {t("auth.email_label")}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email_placeholder")}
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-sm dir-ltr"
                />
                <Mail className="absolute top-3.5 left-3.5 w-4 h-4 text-zinc-400" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-[#C5A059] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-zinc-400 select-none cursor-pointer">
                {t("auth.remember_me")}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري الإرسال عبر Resend...</span>
                </>
              ) : (
                <>
                  <span>{t("auth.send_otp")}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  {t("auth.otp_label")}
                </label>
                <button
                  type="button"
                  onClick={() => setStep("EMAIL")}
                  className="text-xs text-[#C5A059] hover:underline cursor-pointer"
                >
                  تغيير البريد ({email})
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="------"
                  required
                  autoFocus
                  className="w-full tracking-widest text-center py-3 bg-[#1C1C22] border border-[#C5A059]/40 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A059] text-xl font-mono font-bold"
                />
                <KeyRound className="absolute top-3.5 left-3.5 w-4 h-4 text-[#C5A059]" />
              </div>

              {fallbackNotice && (
                <p className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mt-2 text-center">
                  ملاحظة الحساب التجريبي لـ Resend: تم إرسال الرمز للبريد المسجل ({fallbackNotice.sentTo}).
                </p>
              )}

              <p className="text-[11px] text-zinc-500 mt-1.5 text-center">
                {t("auth.otp_desc")}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t("auth.verify_otp")}</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              {countdown > 0 ? (
                <span className="text-xs text-zinc-400">
                  إعادة الإرسال بعد:{" "}
                  <strong className="text-[#C5A059] font-mono font-bold">{formatTime(countdown)}</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSendOtp()}
                  disabled={isLoading}
                  className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>لم يصلك الرمز؟ <span className="text-[#C5A059] font-medium">{t("auth.resend")}</span></span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
