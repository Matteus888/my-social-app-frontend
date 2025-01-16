"use client";

import styles from "@/styles/profile.module.css";
import { useEffect, useState } from "react";
import { use } from "react";

export default function Profile({ params }) {
  const { id } = use(params);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!res.ok) {
          console.error("Failed to fetch user data:", res.status);
          throw new Error("User not found or unauthorized.");
        }
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
    fetchUserData();
  }, [id]);

  if (error) {
    return <p>Profil introuvable</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.page}>
      <p>ProfilePage {userData.profile.firstname}</p>
      <p>ID: {userData.publicId}</p>
    </div>
  );
}
