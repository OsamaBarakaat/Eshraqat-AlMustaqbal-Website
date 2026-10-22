"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Property } from "@/types/property";

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => boolean;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  compareList: [],
  addToCompare: () => false,
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
});

const COMPARE_STORAGE_KEY = "eshraqat_compare_list_v1";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Property[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveList = (list: Property[]) => {
    setCompareList(list);
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  const addToCompare = (property: Property): boolean => {
    if (compareList.some((p) => p.id === property.id)) {
      return true;
    }
    if (compareList.length >= 2) {
      // Replace second one or return false
      const updated = [compareList[0], property];
      saveList(updated);
      return true;
    }
    const updated = [...compareList, property];
    saveList(updated);
    return true;
  };

  const removeFromCompare = (propertyId: string) => {
    const updated = compareList.filter((p) => p.id !== propertyId);
    saveList(updated);
  };

  const clearCompare = () => {
    saveList([]);
  };

  const isInCompare = (propertyId: string) => {
    return compareList.some((p) => p.id === propertyId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
