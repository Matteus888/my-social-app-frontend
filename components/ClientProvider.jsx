"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";
import { FriendProvider } from "@/contexts/FriendContext";

export default function ClientProvider({ children }) {
  const pathname = usePathname();

  const pathsWithoutHeader = ["/login", "/register"];
  const withHeader = !pathsWithoutHeader.includes(pathname);

  return (
    <FriendProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {withHeader && <Header />}
          {children}
        </PersistGate>
      </Provider>
    </FriendProvider>
  );
}
