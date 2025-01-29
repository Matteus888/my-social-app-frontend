"use client";

import { createContext, useContext, useState } from "react";

const FriendContext = createContext();

export function FriendProvider({ children }) {
  const [newFriend, setNewFriend] = useState(false);

  return (
    <FriendContext.Provider
      value={{
        newFriend,
        setNewFriend,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error("useHeader must be used within a FriendProvider");
  }
  return context;
}
