import styles from "../styles/contactsSection.module.css";

import ContactCard from "./ContactCard";

import { useEffect, useState } from "react";
import { useHeader } from "@/contexts/FriendContext";

export default function ContactsSection() {
  const [friendsList, setFriendsList] = useState([]);

  const { newFriend } = useHeader();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch("https://my-social-app-backend.vercel.app/users/friends", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch friends.");
        }

        const data = await res.json();
        setFriendsList(data.friends.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [newFriend]);

  return (
    <div className={styles.contacts}>
      <h2 className={styles.title}>Friends</h2>
      <div className={styles.list}>
        {friendsList.length > 0 ? (
          friendsList.map((friend, i) => (
            <ContactCard
              key={i}
              name={`${friend.profile.firstname} ${friend.profile.lastname}`}
              image={friend.profile.avatar}
              imgWidth={40}
              imgHeight={40}
              fontSize={18}
              txtWidth={230}
              link={`/profile/${friend.publicId}`}
            />
          ))
        ) : (
          <p className={styles.empty}>No friend added</p>
        )}
      </div>
    </div>
  );
}
