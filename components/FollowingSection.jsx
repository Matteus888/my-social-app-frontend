import styles from "../styles/followingSection.module.css";
import ContactCard from "./ContactCard";
import { useState, useEffect } from "react";

export default function FollowingSection() {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/users/following", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch people you follow.");
        }

        const data = await res.json();
        setFollowingList(data.following.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFollowing();
  }, []);

  return (
    <div className={styles.following} style={{ position: "relative" }}>
      <h2 className={styles.title}>Following</h2>
      <div className={styles.list}>
        {followingList.length > 0 ? (
          followingList.map((follow, i) => (
            <ContactCard
              key={i}
              name={`${follow.profile.firstname} ${follow.profile.lastname}`}
              image={follow.profile.avatar}
              imgWidth={40}
              imgHeight={40}
              fontSize={18}
              txtWidth={230}
              link={`/profile/${follow.publicId}`}
            />
          ))
        ) : (
          <p className={styles.empty}>You don't follow anybody</p>
        )}
      </div>
    </div>
  );
}
