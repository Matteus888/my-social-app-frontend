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
  const [followMessage, setFollowMessage] = useState(null);
  const [followErrorMessage, setFollowErrorMessage] = useState(null);
  const [friendRequestMessage, setFriendRequestMessage] = useState(null);
  const [friendRequestErrorMessage, setFriendRequestErrorMessage] = useState(null);

  const handleFriendRequest = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/users/${id}/friend-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (res.ok) {
        const successData = await res.json();
        setFriendRequestMessage(successData.message);
        setFriendRequestErrorMessage(null);
      } else {
        const errorData = await res.json();
        setFriendRequestErrorMessage(errorData.error);
        setFriendRequestMessage(null);
      }
    } catch (err) {
      console.error(err);
      setFriendRequestErrorMessage("Error connecting to the server");
      setFriendRequestMessage(null);
    }
  };

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
        setFollowErrorMessage(null);
      } else {
        const errorData = await res.json();
        setFollowErrorMessage(errorData.error);
        setFollowMessage(null);
      }
    } catch (err) {
      console.error(err);
      setFollowErrorMessage("Error connecting to the server");
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
      <div className={styles.socialBtn}>
        <div>
          {followMessage && <p style={{ color: "green" }}>{followMessage}</p>}
          {followErrorMessage && <p style={{ color: "red" }}>{followErrorMessage}</p>}
          <button onClick={handleFollow}>Follow this person</button>
        </div>
        <div>
          {friendRequestMessage && <p style={{ color: "green" }}>{friendRequestMessage}</p>}
          {friendRequestErrorMessage && <p style={{ color: "red" }}>{friendRequestErrorMessage}</p>}
          <button onClick={handleFriendRequest}>Send a request to be friend</button>
        </div>
      </div>
      <h2>Posts</h2>
      {postsList.length > 0 ? posts : <p>No posts available.</p>}
    </div>
  );
}
