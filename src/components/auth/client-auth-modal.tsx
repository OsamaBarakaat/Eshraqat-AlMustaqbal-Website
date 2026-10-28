"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  MapPin,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useClientAuth } from "@/lib/client-auth";
import { useLanguage } from "@/lib/i18n";
import { normalizeSaudiPhone } from "@/lib/phone";

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: "LOGIN" | "REGISTER" | "FORGOT_PASSWORD";
}

const SAUDI_REGIONS = [
  "منطقة الرياض",
  "منطقة مكة المكرمة",
  "المنطقة الشرقية",
  "منطقة المدينة المنورة",
  "منطقة القصيم",
  "منطقة عسير",
  "منطقة تبوك",
  "منطقة حائل",
  "منطقة الحدود الشمالية",
  "منطقة جازان",
  "منطقة نجران",
  "منطقة الباحة",
  "منطقة الجوف",
];

export function ClientAuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "LOGIN",
}: ClientAuthModalProps) {
  const { dir } = useLanguage();
  const { login, register, requestPasswordRecovery } = useClientAuth();

  const [mode, setMode] = useState<"LOGIN" | "REGISTER" | "FORGOT_PASSWORD">(initialMode);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRememberMe, setLoginRememberMe] = useState(true);

  // Register form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [region, setRegion] = useState("منطقة الرياض");
  const [phone, setPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Forgot password form state
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // Common UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!loginIdentifier.trim()) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني أو رقم الجوال");
      return;
    }
    if (!loginPassword) {
      setErrorMessage("يرجى إدخال كلمة المرور");
      return;
    }

    setIsLoading(true);
    const res = await login(loginIdentifier.trim(), loginPassword, loginRememberMe);
    setIsLoading(false);

    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMessage(res.message || "البريد الإلكتروني/رقم الجوال أو كلمة المرور غير صحيحة");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("يرجى إدخال الاسم الأول واسم العائلة");
      return;
    }

    if (!registerEmail.trim() || !registerEmail.includes("@")) {
      setErrorMessage("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    if (!region) {
      setErrorMessage("يرجى اختيار المنطقة");
      return;
    }

    // Client-side phone normalization validation
    const phoneCheck = normalizeSaudiPhone(phone);
    if (!phoneCheck.isValid) {
      setErrorMessage(phoneCheck.error || "صيغة رقم الجوال غير صحيحة");
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage("كلمة المرور يجب ألا تقل عن 6 خانات");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقتين");
      return;
    }

    setIsLoading(true);
    const res = await register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: registerEmail.trim(),
      region,
      phone: phone.trim(),
      password: registerPassword,
      confirmPassword,
    });
    setIsLoading(false);

    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      setErrorMessage(res.message || "فشل إنشاء الحساب، يرجى المحاولة مرة أخرى");
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!forgotIdentifier.trim()) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني أو رقم الجوال المسجل");
      return;
    }

    setIsLoading(true);
    const res = await requestPasswordRecovery(forgotIdentifier.trim());
    setIsLoading(false);

    if (res.success) {
      setForgotSuccess(true);
      setForgotMessage(res.message);
    } else {
      setErrorMessage(res.message || "حدث خطأ أثناء تقديم طلب استعادة كلمة المرور");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-[#141418] border border-[#C5A059]/30 shadow-2xl shadow-black/90 text-foreground overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex p-2.5 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 mb-2.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {mode === "LOGIN" && "تسجيل دخول العميل"}
            {mode === "REGISTER" && "إنشاء حساب عميل جديد"}
            {mode === "FORGOT_PASSWORD" && "استعادة كلمة المرور"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {mode === "LOGIN" && "أدخل بريدك الإلكتروني أو رقم جوالك للمتابعة"}
            {mode === "REGISTER" && "سجل بياناتك للوصول إلى حجوزاتك ومعايناتك العقارية"}
            {mode === "FORGOT_PASSWORD" && "طلب استعادة كلمة المرور ومراجعته من الإدارة"}
          </p>
        </div>

        {/* Mode Switcher Tabs (Login vs Register) */}
        {mode !== "FORGOT_PASSWORD" && (
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#1C1C22] rounded-2xl border border-white/5 mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("LOGIN");
                setErrorMessage("");
              }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "LOGIN"
                  ? "bg-[#C5A059] text-black shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>تسجيل الدخول</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("REGISTER");
                setErrorMessage("");
              }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "REGISTER"
                  ? "bg-[#C5A059] text-black shadow-md font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>إنشاء حساب جديد</span>
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center animate-in fade-in flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 1: CUSTOMER LOGIN                     */}
        {/* ========================================== */}
        {mode === "LOGIN" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                البريد الإلكتروني أو رقم الجوال:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="name@example.com أو 565642556"
                  required
                  autoFocus
                  className="w-full pl-4 pr-10 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-sm dir-ltr"
                />
                <User className="absolute top-3.5 right-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 text-right">
                💡 في حال تسجيل الدخول برقم الجوال، أدخل الرقم بدون مفتاح الدولة وبدون الصفر الأول (مثال: 565642556)
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  كلمة المرور:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode("FORGOT_PASSWORD");
                    setErrorMessage("");
                    setForgotSuccess(false);
                  }}
                  className="text-xs text-[#C5A059] hover:underline cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-sm dir-ltr"
                />
                <Lock className="absolute top-3.5 right-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 left-3 text-zinc-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="loginRememberMe"
                checked={loginRememberMe}
                onChange={(e) => setLoginRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-[#C5A059] cursor-pointer"
              />
              <label htmlFor="loginRememberMe" className="text-xs text-zinc-400 select-none cursor-pointer">
                تذكر تسجيل دخولي على هذا الجهاز
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-zinc-400 pt-1">
              ليس لديك حساب بعد؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("REGISTER");
                  setErrorMessage("");
                }}
                className="text-[#C5A059] font-bold hover:underline cursor-pointer"
              >
                إنشاء حساب جديد
              </button>
            </p>
          </form>
        )}

        {/* ========================================== */}
        {/* VIEW 2: CUSTOMER REGISTRATION              */}
        {/* ========================================== */}
        {mode === "REGISTER" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  الاسم الأول:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="سعد"
                    required
                    className="w-full px-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  اسم العائلة:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="القحطاني"
                    required
                    className="w-full px-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                البريد الإلكتروني:
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="saad@example.com"
                  required
                  className="w-full pl-3.5 pr-9 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm dir-ltr"
                />
                <Mail className="absolute top-3 right-3 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Region / Area */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                المنطقة أو المدينة:
              </label>
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-3.5 pr-9 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm appearance-none cursor-pointer"
                >
                  {SAUDI_REGIONS.map((r) => (
                    <option key={r} value={r} className="bg-[#1C1C22] text-white">
                      {r}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute top-3 right-3 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Phone Number with Clear Saudi Formatting Hint */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-zinc-300">
                  رقم الجوال:
                </label>
                <span className="text-[10px] text-[#C5A059] font-mono">
                  المملكة العربية السعودية (+966)
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute right-0 top-0 bottom-0 px-3 flex items-center bg-white/5 border-l border-white/10 rounded-r-xl text-xs font-mono text-zinc-300 font-bold select-none">
                  +966
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={9}
                  value={phone}
                  onKeyDown={(e) => {
                    // Allow control keys (Backspace, Tab, Delete, Arrows, Enter, Select All, Copy, Paste)
                    if (
                      [
                        "Backspace",
                        "Delete",
                        "Tab",
                        "Escape",
                        "Enter",
                        "ArrowLeft",
                        "ArrowRight",
                        "Home",
                        "End",
                      ].includes(e.key) ||
                      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
                      (e.metaKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
                    ) {
                      return;
                    }
                    // Prevent any character that is not a numeric digit (0-9)
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    // Extract digits only (in case of paste or virtual keyboard)
                    let val = e.target.value.replace(/\D/g, "");
                    // Automatically strip 966 prefix if user pastes international format
                    if (val.startsWith("9665")) {
                      val = val.slice(3);
                    }
                    // Automatically strip leading zero if user enters 05...
                    if (val.startsWith("05")) {
                      val = val.slice(1);
                    }
                    // Limit strictly to 9 digits
                    if (val.length > 9) {
                      val = val.slice(0, 9);
                    }
                    setPhone(val);
                  }}
                  placeholder="565642556"
                  required
                  className="w-full pr-16 pl-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm font-mono dir-ltr"
                />
              </div>
              <p className="text-[11px] text-[#C5A059]/90 mt-1.5 leading-relaxed bg-[#C5A059]/10 p-2 rounded-lg border border-[#C5A059]/20">
                📌 <strong>تنبيه:</strong> أدخل رقم الجوال بدون مفتاح الدولة (+966) وبدون الصفر الأول، 9 أرقام تبدأ بـ 5 (مثال: <span className="font-mono font-bold text-white">565642556</span>).
              </p>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  كلمة المرور:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-8 pr-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm dir-ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2.5 left-2 text-zinc-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  تأكيد كلمة المرور:
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-8 pr-3 py-2.5 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-xs sm:text-sm dir-ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-2.5 left-2 text-zinc-400 hover:text-white p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري إنشاء الحساب...</span>
                </>
              ) : (
                <>
                  <span>إنشاء الحساب والمتابعة</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-zinc-400 pt-0.5">
              لديك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("LOGIN");
                  setErrorMessage("");
                }}
                className="text-[#C5A059] font-bold hover:underline cursor-pointer"
              >
                تسجيل الدخول
              </button>
            </p>
          </form>
        )}

        {/* ========================================== */}
        {/* VIEW 3: FORGOT PASSWORD REQUEST            */}
        {/* ========================================== */}
        {mode === "FORGOT_PASSWORD" && (
          <div className="space-y-4">
            {forgotSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">تم استلام طلب الاستعادة بنجاح</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {forgotMessage || "تم تسجيل طلبك بنجاح! سيقوم فريق الإدارة وخدمة العملاء بمراجعة حسابك وتزويدك بكلمة المرور الجديدة عبر الواتساب أو الهاتف مباشرة."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode("LOGIN");
                    setForgotSuccess(false);
                  }}
                  className="mt-2 py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  العودة لتسجيل الدخول
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    البريد الإلكتروني أو رقم الجوال المسجل:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="saad@example.com أو 565642556"
                      required
                      autoFocus
                      className="w-full pl-4 pr-10 py-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] text-sm dir-ltr"
                    />
                    <User className="absolute top-3.5 right-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-zinc-400 space-y-1 leading-relaxed">
                  <p className="font-semibold text-zinc-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>حماية أمان الحسابات:</span>
                  </p>
                  <p>
                    سيتم إرسال الطلب للوحة تحكم الإدارة لمراجعته وتعيين كلمة مرور جديدة وإرسالها لكم مباشرة عبر الواتساب لضمان أمان حسابكم.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال الطلب...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال طلب الاستعادة للإدارة</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("LOGIN");
                      setErrorMessage("");
                    }}
                    className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    تذكرت كلمة المرور؟ <span className="text-[#C5A059] font-bold">تسجيل الدخول</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
