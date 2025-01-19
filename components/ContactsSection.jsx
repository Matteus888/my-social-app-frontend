import { useEffect, useState } from "react";
import styles from "../styles/contactsSection.module.css";
import ContactCard from "./ContactCard";
import { useHeader } from "@/contexts/HeaderContext";

export default function ContactsSection() {
  const [friendsList, setFriendsList] = useState([]);
  const { isDropdownOpen } = useHeader();
  const { isFriendRequestOpen } = useHeader();
  const { newFriend } = useHeader();

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/users/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
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
    <div className={styles.contacts} style={{ position: "relative", zIndex: isDropdownOpen || isFriendRequestOpen ? -1 : 1 }}>
      <h2 className={styles.title}>Contacts</h2>
      {friendsList.length > 0 ? (
        friendsList.map((friend, i) => (
          <ContactCard key={i} name={`${friend.profile.firstname} ${friend.profile.lastname}`} image={friend.profile.avatar} />
        ))
      ) : (
        <p className={styles.empty}>No friend added</p>
      )}
    </div>
  );
}
