"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ClientUser {
  email: string;
  name?: string;
  phone?: string;
  token?: string;
}

interface ClientAuthContextType {
  user: ClientUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  sendOtp: (email: string) => Promise<{ success: boolean; message: string; debugOtp?: string }>;
  verifyOtp: (email: string, otp: string, rememberMe: boolean) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: Partial<ClientUser>) => void;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  sendOtp: async () => ({ success: false, message: "" }),
  verifyOtp: async () => ({ success: false, message: "" }),
  updateProfile: () => {},
  logout: () => {},
});

const STORAGE_KEY = "eshraqat_client_auth_user_v1";

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendOtp = async (email: string) => {
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: "تعذر الاتصال بخادم إرسال الرمز." };
    }
  };

  const verifyOtp = async (email: string, otp: string, rememberMe: boolean) => {
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, rememberMe }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        const clientUser: ClientUser = {
          email: data.user.email,
          token: data.user.token,
        };
        setUser(clientUser);
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        }
      }
      return data;
    } catch {
      return { success: false, message: "تعذر تأكيد الرمز مع الخادم." };
    }
  };

  const updateProfile = (data: Partial<ClientUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        sendOtp,
        verifyOtp,
        updateProfile,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  return useContext(ClientAuthContext);
}
