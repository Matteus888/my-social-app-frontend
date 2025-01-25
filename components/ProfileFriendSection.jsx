import styles from "@/styles/profileFriendSection.module.css";
import Image from "next/image";
import Link from "next/link";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
import { useHeader } from "@/contexts/HeaderContext";

export default function ProfileFriendSection({ firstname, id }) {
  const [friendsList, setFriendsList] = useState([]);

  const { newFriend } = useHeader();

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:3000/users/${id}/friends`, {
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
        console.log(data.user);
        setFriendsList(data.user.social.friends.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [newFriend]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{firstname}'s friends</p>
      <div className={styles.line}></div>
      <div className={styles.friendsContainer}>
        {friendsList.length > 0 ? (
          friendsList.map((friend, i) => (
            <div key={i} className={styles.friendCard}>
              <Link href={`/profile/${friend.publicId}`} className={styles.link}>
                <Image src={friend.profile.avatar} width={70} height={70} alt={`${friend.firstname} profile pic`} />
                <p className={styles.name}>
                  {friend.profile.firstname} {friend.profile.lastname}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No friend added</p>
        )}
      </div>
    </div>
  );
}
