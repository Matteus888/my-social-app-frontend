"use client";

import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return <HeaderContext.Provider value={{ isDropdownOpen, setIsDropdownOpen }}>{children}</HeaderContext.Provider>;
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
