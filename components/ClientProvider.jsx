"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { HeaderProvider } from "@/contexts/HeaderContext";

export default function ClientProvider({ children }) {
  const pathname = usePathname();

  const pathsWithoutHeader = ["/login", "/register"];
  const withHeader = !pathsWithoutHeader.includes(pathname);

  return (
    <HeaderProvider>
      <Provider store={store}>
        {withHeader && <Header />}
        {children}
      </Provider>
    </HeaderProvider>
  );
}
