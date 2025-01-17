"use client";

import styles from "@/styles/profile.module.css";
import PostedCard from "@/components/PostedCard";
import { useEffect, useState } from "react";
import { use } from "react";

export default function Profile({ params }) {
  const { id } = use(params);
  const [userData, setUserData] = useState(null);
  const [postsList, setPostsList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [followMessage, setFollowMessage] = useState(null);

  // Bouton "Friend request"

  const handleFollow = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/users/${id}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (res.ok) {
        const successData = await res.json();
        setFollowMessage(successData.message);
        setErrorMessage(null);
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Something went wrong");
        setFollowMessage(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Error connecting to the server");
      setFollowMessage(null);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
      try {
        const userRes = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!userRes.ok) {
          console.error("Failed to fetch user data:", userRes.status);
          throw new Error("User not found or unauthorized.");
        }
        const userData = await userRes.json();
        setUserData(userData.user);

        const postsRes = await fetch(`http://localhost:3000/users/${id}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!postsRes.ok) {
          console.error("Failed to fetch user posts:", postsRes.status);
          throw new Error("Could not fetch posts.");
        }
        const postsData = await postsRes.json();
        setPostsList(postsData.posts.reverse());
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

  const posts = postsList.map((post, i) => <PostedCard key={i} author={userData} content={post.content} date={post.createdAt} />);

  return (
    <div className={styles.page}>
      <p>ProfilePage {userData.profile.firstname}</p>
      <p>ID: {userData.publicId}</p>
      {/* Affichage du message de succès ou d'erreur */}
      {followMessage && <p style={{ color: "green" }}>{followMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={handleFollow}>Follow this person</button>
      <h2>Posts</h2>
      {postsList.length > 0 ? posts : <p>No posts available.</p>}
    </div>
  );
}
