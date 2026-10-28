"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiService } from "./api-service";

export interface ClientUser {
  id?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  region?: string;
  token?: string;
}

export interface RegisterCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ClientAuthContextType {
  user: ClientUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (
    identifier: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    data: RegisterCustomerData,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; message?: string }>;
  requestPasswordRecovery: (identifier: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => ({ success: false, message: "" }),
  register: async () => ({ success: false, message: "" }),
  requestPasswordRecovery: async () => ({ success: false, message: "" }),
  resetPassword: async () => ({ success: false, message: "" }),
  logout: () => {},
});

const STORAGE_KEY = "eshraqat_client_auth_user_v2";

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    identifier: string,
    password: string,
    rememberMe: boolean = true,
  ) => {
    try {
      const res = await ApiService.loginCustomer(identifier, password);
      const payload = res?.data !== undefined ? res.data : res;
      if (payload && payload.user) {
        const clientUser: ClientUser = {
          id: payload.user.id,
          name: payload.user.name || `${payload.user.firstName || ""} ${payload.user.lastName || ""}`.trim(),
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          email: payload.user.email,
          phone: payload.user.phone,
          region: payload.user.region,
          token: payload.token,
        };

        setUser(clientUser);
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        }

        return { success: true, message: payload.message || "تم تسجيل الدخول بنجاح" };
      }
      return { success: false, message: "فشل تسجيل الدخول، يرجى المحاولة مرة أخرى" };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "البريد الإلكتروني/رقم الجوال أو كلمة المرور غير صحيحة",
      };
    }
  };

  const register = async (
    data: RegisterCustomerData,
    rememberMe: boolean = true,
  ) => {
    try {
      const res = await ApiService.registerCustomer(data);
      const payload = res?.data !== undefined ? res.data : res;
      if (payload && payload.user) {
        const clientUser: ClientUser = {
          id: payload.user.id,
          name: payload.user.name || `${payload.user.firstName} ${payload.user.lastName}`,
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          email: payload.user.email,
          phone: payload.user.phone,
          region: payload.user.region,
          token: payload.token,
        };

        setUser(clientUser);
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
        }

        return { success: true, message: payload.message || "تم إنشاء الحساب بنجاح" };
      }
      return { success: false, message: "فشل إنشاء الحساب" };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "حدث خطأ أثناء إنشاء الحساب",
      };
    }
  };

  const requestPasswordRecovery = async (identifier: string) => {
    try {
      const res = await ApiService.requestPasswordRecovery(identifier);
      return {
        success: true,
        message:
          res?.message ||
          "تم إرسال طلب استعادة كلمة المرور لمراجعة الإدارة بنجاح.",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "حدث خطأ أثناء تقديم طلب استعادة كلمة المرور",
      };
    }
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      const res = await ApiService.resetPassword(token, password, confirmPassword);
      return {
        success: true,
        message: res?.message || "تم تعيين كلمة المرور الجديدة بنجاح.",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "فشل تعيين كلمة المرور الجديدة",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    // Remove cookie if set
    document.cookie =
      "eshraqat_client_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        requestPasswordRecovery,
        resetPassword,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider");
  }
  return context;
}
