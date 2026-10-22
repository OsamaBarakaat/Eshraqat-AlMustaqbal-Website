"use client";

export interface ClientBooking {
  id: string;
  propertyId: string;
  propertyCode: string;
  propertyTitle: string;
  propertyTitleEn?: string;
  propertyImage: string;
  propertyCity: string;
  propertyDistrict: string;
  propertyPrice: number;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "16:30"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: "PENDING_CONFIRMATION" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REJECTED" | "NO_SHOW" | string;
  createdAt: string;
}

const STORAGE_KEY = "eshraqat_client_bookings_v1";

export const ClientBookingsService = {
  getAll(): ClientBooking[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return [];
  },

  getByUserEmail(email: string): ClientBooking[] {
    if (!email) return [];
    const all = this.getAll();
    const normalized = email.trim().toLowerCase();
    return all.filter((b) => (b.customerEmail || "").toLowerCase() === normalized);
  },

  add(booking: ClientBooking): void {
    if (typeof window === "undefined") return;
    try {
      const all = this.getAll();
      const updated = [booking, ...all.filter((b) => b.id !== booking.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save booking:", err);
    }
  },

  syncWithServer(serverBookings: ClientBooking[]): ClientBooking[] {
    if (typeof window === "undefined") return serverBookings;
    try {
      const local = this.getAll();
      const mergedMap = new Map<string, ClientBooking>();

      // Add server bookings as authoritative source
      serverBookings.forEach((b) => {
        mergedMap.set(b.id, b);
      });

      // Match and update local bookings
      local.forEach((loc) => {
        const matchingServer = serverBookings.find(
          (s) =>
            s.id === loc.id ||
            (s.propertyId === loc.propertyId && s.date === loc.date && s.time === loc.time)
        );
        if (matchingServer) {
          mergedMap.set(matchingServer.id, {
            ...loc,
            id: matchingServer.id,
            status: matchingServer.status,
          });
        } else {
          if (!mergedMap.has(loc.id)) {
            mergedMap.set(loc.id, loc);
          }
        }
      });

      const mergedList = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList));
      return mergedList;
    } catch {
      return serverBookings;
    }
  },

  updateStatus(id: string, status: ClientBooking["status"]): void {
    if (typeof window === "undefined") return;
    try {
      const all = this.getAll();
      const updated = all.map((b) => (b.id === id ? { ...b, status } : b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update booking status:", err);
    }
  },

  cancel(id: string): void {
    this.updateStatus(id, "CANCELLED");
  },
};
