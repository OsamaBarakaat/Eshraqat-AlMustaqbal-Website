"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Loader2,
  User,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { ApiService, ClientInquiry } from "@/lib/api-service";
import { useClientAuth } from "@/lib/client-auth";
import { useLanguage } from "@/lib/i18n";

const LAST_SEEN_KEY = "eshraqat_last_seen_inquiry_reply_v1";

export function ClientChatWidget() {
  const { user, isLoggedIn } = useClientAuth();
  const { t, lang, dir } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"HISTORY" | "NEW">("HISTORY");
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadReply, setHasUnreadReply] = useState(false);

  // For non-logged-in guest tracking
  const [lookupEmail, setLookupEmail] = useState("");
  const [effectiveEmail, setEffectiveEmail] = useState("");

  // New inquiry form state
  const [newSubject, setNewSubject] = useState("استفسار عقاري عام");
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync effective email with logged-in user
  useEffect(() => {
    if (user?.email) {
      setEffectiveEmail(user.email);
      setLookupEmail(user.email);
    }
  }, [user]);

  // Fetch inquiries for effective email
  const fetchInquiries = useCallback(async (emailToQuery: string) => {
    if (!emailToQuery || !emailToQuery.includes("@")) return;
    setIsLoading(true);
    try {
      const items = await ApiService.getClientInquiries(emailToQuery);
      setInquiries(items);

      // Check if any reply is newer than last seen
      const lastSeenStr = localStorage.getItem(LAST_SEEN_KEY);
      const lastSeenTime = lastSeenStr ? new Date(lastSeenStr).getTime() : 0;

      const unread = items.some((item) => {
        if (item.status === "REPLIED" && item.repliedAt) {
          const repliedTime = new Date(item.repliedAt).getTime();
          return repliedTime > lastSeenTime;
        }
        return false;
      });

      setHasUnreadReply(unread);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Poll for replies every 30 seconds when an email is present
  useEffect(() => {
    if (effectiveEmail) {
      fetchInquiries(effectiveEmail);
      const interval = setInterval(() => {
        fetchInquiries(effectiveEmail);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [effectiveEmail, fetchInquiries]);

  // When user opens widget and views history, mark replies as seen
  const handleOpenWidget = useCallback(() => {
    setIsOpen(true);
    if (effectiveEmail) {
      fetchInquiries(effectiveEmail);
    }
    // Update last seen
    localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    setHasUnreadReply(false);
  }, [effectiveEmail, fetchInquiries]);

  // Listen to external open events (e.g. from navbar or notification badges)
  useEffect(() => {
    const handleOpenCustom = () => {
      handleOpenWidget();
    };
    window.addEventListener("open-client-chat", handleOpenCustom);
    return () => window.removeEventListener("open-client-chat", handleOpenCustom);
  }, [handleOpenWidget]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupEmail.trim() && lookupEmail.includes("@")) {
      setEffectiveEmail(lookupEmail.trim().toLowerCase());
      fetchInquiries(lookupEmail.trim().toLowerCase());
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const emailToSend = user?.email || effectiveEmail || lookupEmail.trim();
    if (!emailToSend || !emailToSend.includes("@")) {
      setActiveTab("HISTORY");
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const res = await ApiService.submitInquiry({
      name: newName.trim() || user?.name || emailToSend.split("@")[0],
      email: emailToSend,
      phone: newPhone.trim() || user?.phone || undefined,
      subject: newSubject,
      message: newMessage.trim(),
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setNewMessage("");
      // Refresh inquiries list
      await fetchInquiries(emailToSend);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveTab("HISTORY");
      }, 1200);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        className={`fixed bottom-6 ${
          dir === "rtl" ? "left-6" : "right-6"
        } z-40 flex items-center gap-3 select-none`}
      >
        {/* Pulsing Alarm Pill when there's an unread reply */}
        {hasUnreadReply && !isOpen && (
          <button
            onClick={handleOpenWidget}
            className="animate-bounce shadow-xl flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141418] border border-emerald-500/50 text-white text-xs font-bold cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400">
              {lang === "en" ? "New reply from Support!" : "رد جديد من إدارة إشراقة!"}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={isOpen ? () => setIsOpen(false) : handleOpenWidget}
          className="relative group p-4 rounded-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 active:scale-95 text-black shadow-2xl shadow-[#C5A059]/40 border border-white/20 transition-all cursor-pointer flex items-center justify-center"
          title={lang === "en" ? "Chat with property consultants" : "استفسارات ومحادثة مستشاري إشراقة"}
          aria-label="محادثة الدعم"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}

          {/* Persistent Green Status Dot (Alarms customer when admins responded) */}
          {hasUnreadReply && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#09090B]"></span>
            </span>
          )}

          {/* Tooltip on hover if no unread */}
          {!hasUnreadReply && !isOpen && (
            <span className="hidden sm:group-hover:inline-block absolute bottom-full mb-2 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-semibold whitespace-nowrap border border-white/10 shadow-lg pointer-events-none">
              {lang === "en" ? "Messages & Consultations" : "صندوق الاستفسارات والردود"}
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-24 ${
            dir === "rtl" ? "left-4 sm:left-6" : "right-4 sm:right-6"
          } z-50 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] rounded-3xl bg-[#141418] border border-[#C5A059]/40 shadow-2xl shadow-black flex flex-col overflow-hidden text-foreground animate-in slide-in-from-bottom-5 duration-300 ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
        >
          {/* Panel Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1C1C22] to-[#141418] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-2xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                <Sparkles className="w-5 h-5" />
                {/* Active online indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#141418]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{lang === "en" ? "Inquiries & Direct Support" : "استفسارات ورسائل الموقع"}</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{lang === "en" ? "Consultants available online" : "مستشارو إشراقة متواجدون للرد"}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-white/10 bg-[#141418] shrink-0 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("HISTORY")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "HISTORY"
                  ? "bg-[#C5A059] text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "My Messages" : "محادثاتي والردود"}</span>
              {inquiries.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === "HISTORY" ? "bg-black/20 text-black" : "bg-white/10 text-white"
                  }`}
                >
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("NEW")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "NEW"
                  ? "bg-[#C5A059] text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Send Inquiry" : "إرسال استفسار جديد"}</span>
            </button>
          </div>

          {/* Tab Content 1: Message Threads & Admin Replies */}
          {activeTab === "HISTORY" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {/* Email Identifier if guest or change email */}
              {!effectiveEmail ? (
                <div className="p-4 rounded-2xl bg-[#1C1C22] border border-white/10 space-y-3 text-center my-6">
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mx-auto">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {lang === "en" ? "View Your Messages History" : "متابعة رسائلك وردود الإدارة"}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      {lang === "en"
                        ? "Enter your email to display your inquiry threads and consultant answers."
                        : "أدخل بريدك الإلكتروني لعرض سجل استفساراتك وردود المستشارين المعتمدة."}
                    </p>
                  </div>

                  <form onSubmit={handleLookupSubmit} className="space-y-2">
                    <input
                      type="email"
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      placeholder={lang === "en" ? "Your email address..." : "بريدك الإلكتروني..."}
                      required
                      className="w-full px-3 py-2 bg-[#141418] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:brightness-110 cursor-pointer transition-all"
                    >
                      {lang === "en" ? "Show My Messages" : "استعراض الرسائل"}
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Account banner & Refresh Button */}
                  <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/5 text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-mono text-zinc-300 truncate">{effectiveEmail}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => fetchInquiries(effectiveEmail)}
                      disabled={isLoading}
                      className="flex items-center gap-1 text-[#C5A059] hover:underline cursor-pointer shrink-0"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                      <span>{lang === "en" ? "Refresh" : "تحديث"}</span>
                    </button>
                  </div>

                  {/* Messages Feed */}
                  {isLoading && inquiries.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <Loader2 className="w-6 h-6 text-[#C5A059] animate-spin mx-auto" />
                      <p className="text-xs text-zinc-400">
                        {lang === "en" ? "Loading messages..." : "جاري تحميل محادثاتك..."}
                      </p>
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-14 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 text-zinc-500 flex items-center justify-center mx-auto">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-zinc-300 font-semibold">
                        {lang === "en" ? "No messages found yet" : "لا توجد رسائل سابقة مسجلة"}
                      </p>
                      <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                        {lang === "en"
                          ? "Send your first inquiry and our investment consultants will answer you here!"
                          : "يمكنك إرسال استفسارك وسيقوم مستشارنا العقاري بالرد عليك هنا فوراً."}
                      </p>
                      <button
                        onClick={() => setActiveTab("NEW")}
                        className="px-4 py-2 rounded-xl bg-[#C5A059] text-black text-xs font-bold hover:brightness-110 cursor-pointer"
                      >
                        {lang === "en" ? "Send New Inquiry" : "إرسال استفسار الآن"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => {
                        const isReplied = inq.status === "REPLIED" && inq.replyNotes;
                        return (
                          <div
                            key={inq.id}
                            className="p-3.5 rounded-2xl bg-[#1C1C22] border border-white/10 space-y-3 shadow-md"
                          >
                            {/* Inquiry Header */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white truncate max-w-[190px]">
                                {inq.subject}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                                  isReplied
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : inq.status === "IN_PROGRESS"
                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                    : "bg-zinc-700/40 text-zinc-300 border border-zinc-600/30"
                                }`}
                              >
                                {isReplied
                                  ? lang === "en"
                                    ? "Replied"
                                    : "تم الرد"
                                  : inq.status === "IN_PROGRESS"
                                  ? lang === "en"
                                    ? "In Progress"
                                    : "قيد المتابعة"
                                  : lang === "en"
                                  ? "Pending"
                                  : "قيد المراجعة"}
                              </span>
                            </div>

                            {/* Client's Message Bubble */}
                            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                              {inq.message}
                            </div>

                            {/* Date */}
                            <div className="flex items-center justify-between text-[10px] text-zinc-500">
                              <span>
                                {new Date(inq.submittedAt).toLocaleDateString(
                                  lang === "en" ? "en-US" : "ar-SA"
                                )}{" "}
                                -{" "}
                                {new Date(inq.submittedAt).toLocaleTimeString(
                                  lang === "en" ? "en-US" : "ar-SA",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                              {inq.relatedPropertyTitle && (
                                <span className="text-[#C5A059] truncate max-w-[130px]">
                                  {inq.relatedPropertyTitle}
                                </span>
                              )}
                            </div>

                            {/* Admin Reply Bubble with Green / Gold Accent */}
                            {isReplied ? (
                              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#141418] border border-emerald-500/40 space-y-2 mt-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>
                                      {inq.assignedEmployeeName
                                        ? inq.assignedEmployeeName
                                        : lang === "en"
                                        ? "Eshraqat Consultant"
                                        : "مستشار إشراقة المستقبل"}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-emerald-500/80 font-mono">
                                    {inq.repliedAt
                                      ? new Date(inq.repliedAt).toLocaleTimeString(
                                          lang === "en" ? "en-US" : "ar-SA",
                                          { hour: "2-digit", minute: "2-digit" }
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <p className="text-xs text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
                                  {inq.replyNotes}
                                </p>
                              </div>
                            ) : (
                              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 shrink-0 animate-spin" />
                                <span>
                                  {lang === "en"
                                    ? "Consultant is reviewing your inquiry..."
                                    : "الرسالة قيد دراسة المستشار العقاري، سيصلك الرد هنا قريباً."}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Tab Content 2: Send New Inquiry Form */}
          {activeTab === "NEW" && (
            <form
              onSubmit={handleSendInquiry}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin flex flex-col justify-between"
            >
              <div className="space-y-3">
                {submitSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      {lang === "en"
                        ? "Inquiry sent successfully to our team!"
                        : "تم إرسال استفسارك بنجاح إلى فريق الإدارة!"}
                    </span>
                  </div>
                )}

                {/* Email (auto-filled if logged in) */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    {lang === "en" ? "Your Email (for tracking replies):" : "البريد الإلكتروني (لتلقي ومتابعة الردود):"}
                  </label>
                  <input
                    type="email"
                    value={user?.email || lookupEmail}
                    onChange={(e) => {
                      setLookupEmail(e.target.value);
                      setEffectiveEmail(e.target.value);
                    }}
                    placeholder="email@example.com"
                    required
                    disabled={Boolean(user?.email)}
                    className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] disabled:opacity-60"
                  />
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      {lang === "en" ? "Name:" : "الاسم الكريم:"}
                    </label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={lang === "en" ? "Your name" : "مثال: عبدالله"}
                      className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                      {lang === "en" ? "Phone:" : "رقم الجوال:"}
                    </label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    {lang === "en" ? "Subject:" : "موضوع الاستفسار:"}
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="استفسار عن عقار">{lang === "en" ? "Property Inquiry" : "استفسار عن عقار معروض"}</option>
                    <option value="طلب استشارة استثمارية">{lang === "en" ? "Investment Consultation" : "طلب استشارة استثمارية"}</option>
                    <option value="حاسبة التمويل العقاري">{lang === "en" ? "Mortgage Financing" : "استفسار عن التمويل العقاري"}</option>
                    <option value="عرض عقار للبيع">{lang === "en" ? "List My Property" : "عرض عقاري للبيع أو الإدارة"}</option>
                    <option value="استفسار عام">{lang === "en" ? "General Question" : "استفسار عام"}</option>
                  </select>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    {lang === "en" ? "Message Text:" : "نص الرسالة أو الاستفسار بالتفصيل:"}
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={4}
                    required
                    placeholder={
                      lang === "en"
                        ? "Type your question or request here..."
                        : "اكتب استفسارك بالتفصيل وسيقوم مستشارنا بالرد عليك هنا فوراً..."
                    }
                    className="w-full p-3 bg-[#1C1C22] border border-white/10 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !newMessage.trim()}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-black shadow-lg shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{lang === "en" ? "Send to Advisors" : "إرسال الاستفسار للمستشارين"}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
