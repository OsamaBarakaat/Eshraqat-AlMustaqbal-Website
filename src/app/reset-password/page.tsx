"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  Home,
} from "lucide-react";
import { ApiService } from "@/lib/api-service";
import { FloatingGoldenBubbles } from "@/components/shared/floating-golden-bubbles";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [clientInfo, setClientInfo] = useState<{ clientName: string; clientEmail?: string } | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setTokenValid(false);
      setVerifyError("رابط استعادة كلمة المرور غير صالح أو مفقود. يرجى طلب رابط جديد.");
      return;
    }

    let isMounted = true;
    setVerifying(true);
    setVerifyError(null);

    ApiService.verifyResetToken(token)
      .then((data) => {
        if (!isMounted) return;
        setTokenValid(true);
        setClientInfo({
          clientName: data.clientName,
          clientEmail: data.clientEmail,
        });
      })
      .catch((err: any) => {
        if (!isMounted) return;
        setTokenValid(false);
        setVerifyError(
          err?.message || "رابط استعادة كلمة المرور منتهي الصلاحية أو تم استخدامه مسبقاً."
        );
      })
      .finally(() => {
        if (isMounted) setVerifying(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (password.length < 6) {
      setSubmitError("كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام");
      return;
    }

    if (password !== confirmPassword) {
      setSubmitError("كلمتا المرور غير متطابقتين");
      return;
    }

    setSubmitting(true);
    try {
      await ApiService.resetPassword(token, password, confirmPassword);
      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err?.message || "فشل تعيين كلمة المرور الجديدة. الرجاء المحاولة مجدداً.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-[#0A0A0C] via-[#121216] to-[#0A0A0C]" dir="rtl">
      {/* Background Decor */}
      <FloatingGoldenBubbles />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Verification Loader */}
        {verifying && (
          <div className="bg-[#141418]/90 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">جاري التحقق من الرابط...</h2>
            <p className="text-sm text-[#A0A0A5]">يرجى الانتظار ريثما نتحقق من صلاحية رابط الاستعادة الأمني.</p>
          </div>
        )}

        {/* Invalid / Expired Token */}
        {!verifying && !tokenValid && (
          <div className="bg-[#141418]/90 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">رابط غير صالح أو منتهي</h2>
            <p className="text-sm text-[#A0A0A5] leading-relaxed mb-6">
              {verifyError || "عذراً، هذا الرابط غير صالح أو تم استخدامه مسبقاً لأسباب أمنية."}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38E46] hover:to-[#C5A059] text-black font-semibold rounded-xl text-center shadow-lg transition-all"
              >
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        )}

        {/* Success State */}
        {!verifying && tokenValid && isSuccess && (
          <div className="bg-[#141418]/90 backdrop-blur-xl border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">تم تعيين كلمة المرور بنجاح</h2>
            <p className="text-sm text-[#A0A0A5] leading-relaxed mb-6">
              أصبح بإمكانك الآن تسجيل الدخول لحسابك باستخدام كلمة المرور الجديدة عبر البريد الإلكتروني أو رقم الهاتف.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38E46] hover:to-[#C5A059] text-black font-semibold rounded-xl text-center shadow-lg transition-all"
            >
              <Home className="w-4 h-4" />
              الذهاب إلى الرئيسية وتجسيل الدخول
            </Link>
          </div>
        )}

        {/* Reset Password Form */}
        {!verifying && tokenValid && !isSuccess && (
          <div className="bg-[#141418]/95 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <KeyRound className="w-7 h-7 text-[#C5A059]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">تعيين كلمة المرور الجديدة</h2>
              {clientInfo?.clientName && (
                <p className="text-sm text-[#C5A059] font-medium">
                  مرحباً، {clientInfo.clientName}
                </p>
              )}
              <p className="text-xs text-[#8E8E93] mt-1">
                الرجاء إدخال كلمة مرور جديدة قوية وتأكيدها للمتابعة
              </p>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-xs font-medium text-[#C5A059] mb-1.5">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8E8E93]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-3 bg-[#0A0A0C]/80 border border-[#C5A059]/20 rounded-xl text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8E8E93] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-medium text-[#C5A059] mb-1.5">
                  تأكيد كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#8E8E93]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-10 py-3 bg-[#0A0A0C]/80 border border-[#C5A059]/20 rounded-xl text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8E8E93] hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Validation helper */}
              <div className="bg-[#0A0A0C]/40 border border-[#C5A059]/10 rounded-lg p-3 text-xs text-[#8E8E93] space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>يجب أن لا تقل كلمة المرور عن 6 خانات.</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38E46] hover:to-[#C5A059] text-black font-semibold rounded-xl text-sm shadow-lg shadow-[#C5A059]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>تأكيد وحفظ كلمة المرور</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center bg-[#0A0A0C]">
          <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
