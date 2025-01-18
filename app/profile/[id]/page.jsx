"use client";

import styles from "@/styles/profile.module.css";
import PostedCard from "@/components/PostedCard";
import PostCardModal from "@/components/PostCardModal";
import PostInputBtn from "@/components/PostInputBtn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const [isFriend, setIsFriend] = useState(null);
  const [hasFollower, setHasFollower] = useState(null);
  const [isFollower, setIsFollower] = useState(null);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [newPost, setNewPost] = useState(false);

  const user = useSelector((state) => state.user.value);

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
        console.log(user);
        console.log(userData);
        if (user.friends.includes(userData.user._id)) {
          setIsFriend(true);
        }
        if (user.followers.includes(userData.user._id)) {
          setHasFollower(true);
        }
        if (user.following.includes(userData.user._id)) {
          setIsFollower(true);
        }

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
  }, [id, newPost]);

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
        isFollower ? setIsFollower(false) : setIsFollower(true);
        hasFollower ? setHasFollower(true) : setHasFollower(false);
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

  if (error) {
    return <p>Profil introuvable</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  const openPostCardModal = () => setIsPostCardModalOpen(true);
  const closePostCardModal = () => setIsPostCardModalOpen(false);

  const posts = postsList.map((post, i) => <PostedCard key={i} author={userData} content={post.content} date={post.createdAt} />);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Image src={userData.profile.avatar} width={150} height={150} alt={`${userData.profile.firstname} pic`} />
        <p>ProfilePage {userData.profile.firstname}</p>
        <div className={styles.socialBtn}>
          <div>
            {followMessage && <p style={{ color: "green" }}>{followMessage}</p>}
            {followErrorMessage && <p style={{ color: "red" }}>{followErrorMessage}</p>}
            {!isFriend && <button onClick={handleFollow}>{!isFollower ? <p>Follow this person</p> : <p>Unfollow this person</p>}</button>}
            {isFollower && <p>You follow this guy</p>}
            {hasFollower && <p>You are follow by this guy</p>}
          </div>
          <div>
            {friendRequestMessage && <p style={{ color: "green" }}>{friendRequestMessage}</p>}
            {friendRequestErrorMessage && <p style={{ color: "red" }}>{friendRequestErrorMessage}</p>}
            {!isFriend ? (
              <button onClick={handleFriendRequest} className={styles.friendBtn}>
                Send a friend request
              </button>
            ) : (
              <p>I'm your friend</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.randomCard}></div>
        <div className={styles.postsFlow}>
          <PostInputBtn onOpenPostCardModal={openPostCardModal} placeholder={`Write a message to ${userData.profile.firstname}`} />
          {isPostCardModalOpen && (
            <PostCardModal
              onClosePostCardModal={closePostCardModal}
              onNewPost={() => setNewPost(!newPost)}
              placeholder={`Write a message to ${userData.profile.firstname}`}
            />
          )}
          {postsList.length > 0 ? posts : <p>No posts available.</p>}
        </div>
      </div>
    </div>
  );
}
