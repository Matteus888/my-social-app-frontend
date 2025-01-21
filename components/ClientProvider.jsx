"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { useEffect, useState } from "react";

export default function ClientProvider({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const pathsWithoutHeader = ["/login", "/register"];
  const withHeader = !pathsWithoutHeader.includes(pathname);

  useEffect(() => {
    setIsClient(true); // Assurez-vous que l'application est rendue côté client
  }, []);

  if (!isClient) {
    return null; // Empêche le rendu côté serveur
  }

  return (
    <HeaderProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {withHeader && <Header />}
          {children}
        </PersistGate>
      </Provider>
    </HeaderProvider>
  );
}
