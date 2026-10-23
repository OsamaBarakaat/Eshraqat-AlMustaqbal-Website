"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ApiService, ClientInquiry } from "./api-service";
import { useClientAuth } from "./client-auth";

const READ_KEYS_STORAGE = "eshraqat_read_inquiry_keys_v2";
const GUEST_EMAIL_STORAGE = "eshraqat_guest_inquiry_email_v1";

interface InquiriesContextType {
  inquiries: ClientInquiry[];
  isLoading: boolean;
  effectiveEmail: string;
  setEffectiveEmail: (email: string) => void;
  unreadCount: number;
  hasUnreadReply: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChat: (tab?: "HISTORY" | "NEW") => void;
  closeChat: () => void;
  activeTab: "HISTORY" | "NEW";
  setActiveTab: (tab: "HISTORY" | "NEW") => void;
  isItemRead: (inquiry: ClientInquiry) => boolean;
  markAsRead: (inquiryId: string) => void;
  markAllAsRead: () => void;
  refreshInquiries: () => Promise<void>;
}

const InquiriesContext = createContext<InquiriesContextType>({
  inquiries: [],
  isLoading: false,
  effectiveEmail: "",
  setEffectiveEmail: () => {},
  unreadCount: 0,
  hasUnreadReply: false,
  isOpen: false,
  setIsOpen: () => {},
  openChat: () => {},
  closeChat: () => {},
  activeTab: "HISTORY",
  setActiveTab: () => {},
  isItemRead: () => true,
  markAsRead: () => {},
  markAllAsRead: () => {},
  refreshInquiries: async () => {},
});

export function InquiriesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useClientAuth();

  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [effectiveEmail, setEffectiveEmailState] = useState("");
  const [readKeys, setReadKeys] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"HISTORY" | "NEW">("HISTORY");

  // Load saved read keys & guest email on mount
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem(READ_KEYS_STORAGE);
      if (savedKeys) {
        setReadKeys(JSON.parse(savedKeys));
      }
      const savedGuestEmail = localStorage.getItem(GUEST_EMAIL_STORAGE);
      if (!user?.email && savedGuestEmail) {
        setEffectiveEmailState(savedGuestEmail);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const fetchInquiries = useCallback(
    async (emailToQuery: string) => {
      if (!emailToQuery || !emailToQuery.includes("@")) {
        setInquiries([]);
        return;
      }
      setIsLoading(true);
      try {
        const items = await ApiService.getClientInquiries(emailToQuery);
        setInquiries(items);
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Sync with logged-in user
  useEffect(() => {
    if (user?.email) {
      setEffectiveEmailState(user.email);
    }
  }, [user]);

  // Listen to external refresh-inquiries events
  useEffect(() => {
    const handleRefresh = () => {
      const savedGuestEmail = localStorage.getItem(GUEST_EMAIL_STORAGE);
      const email = user?.email || savedGuestEmail || effectiveEmail;
      if (email && email.includes("@")) {
        setEffectiveEmailState(email);
        fetchInquiries(email);
      }
    };
    window.addEventListener("refresh-inquiries", handleRefresh);
    return () => window.removeEventListener("refresh-inquiries", handleRefresh);
  }, [user, effectiveEmail, fetchInquiries]);

  const setEffectiveEmail = useCallback((email: string) => {
    const cleaned = email.trim().toLowerCase();
    setEffectiveEmailState(cleaned);
    try {
      localStorage.setItem(GUEST_EMAIL_STORAGE, cleaned);
    } catch {
      // ignore
    }
  }, []);

  const getInquiryKey = (inq: ClientInquiry) => {
    return `${inq.id}_${inq.repliedAt || inq.status || "replied"}`;
  };

  const isItemRead = useCallback(
    (item: ClientInquiry): boolean => {
      // If it doesn't have a reply yet, it's not an unread reply
      if (item.status !== "REPLIED" || !item.replyNotes) {
        return true;
      }
      const key = getInquiryKey(item);
      return readKeys.includes(key);
    },
    [readKeys]
  );

  // Poll for inquiries every 30 seconds
  useEffect(() => {
    if (effectiveEmail && effectiveEmail.includes("@")) {
      fetchInquiries(effectiveEmail);
      const interval = setInterval(() => {
        fetchInquiries(effectiveEmail);
      }, 30000);
      return () => clearInterval(interval);
    } else {
      setInquiries([]);
    }
  }, [effectiveEmail, fetchInquiries]);

  // Compute unread count & unread status
  // STRICT RULE: If inquiries.length === 0, then hasUnreadReply MUST BE FALSE
  const unreadItems = inquiries.filter((item) => !isItemRead(item));
  const unreadCount = inquiries.length > 0 ? unreadItems.length : 0;
  const hasUnreadReply = inquiries.length > 0 && unreadCount > 0;

  // Mark single inquiry as read
  const markAsRead = useCallback(
    (inquiryId: string) => {
      const target = inquiries.find((i) => i.id === inquiryId);
      if (!target) return;
      const key = getInquiryKey(target);
      setReadKeys((prev) => {
        if (prev.includes(key)) return prev;
        const updated = [...prev, key];
        try {
          localStorage.setItem(READ_KEYS_STORAGE, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [inquiries]
  );

  // Mark all inquiries as read
  const markAllAsRead = useCallback(() => {
    if (inquiries.length === 0) return;
    const newKeysToAdd = inquiries
      .filter((i) => i.status === "REPLIED" && i.replyNotes)
      .map(getInquiryKey);

    setReadKeys((prev) => {
      const merged = Array.from(new Set([...prev, ...newKeysToAdd]));
      try {
        localStorage.setItem(READ_KEYS_STORAGE, JSON.stringify(merged));
      } catch {
        // ignore
      }
      return merged;
    });
  }, [inquiries]);

  const openChat = useCallback((tab?: "HISTORY" | "NEW") => {
    if (tab) setActiveTab(tab);
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const refreshInquiries = useCallback(async () => {
    if (effectiveEmail) {
      await fetchInquiries(effectiveEmail);
    }
  }, [effectiveEmail, fetchInquiries]);

  return (
    <InquiriesContext.Provider
      value={{
        inquiries,
        isLoading,
        effectiveEmail,
        setEffectiveEmail,
        unreadCount,
        hasUnreadReply,
        isOpen,
        setIsOpen,
        openChat,
        closeChat,
        activeTab,
        setActiveTab,
        isItemRead,
        markAsRead,
        markAllAsRead,
        refreshInquiries,
      }}
    >
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiries() {
  return useContext(InquiriesContext);
}
