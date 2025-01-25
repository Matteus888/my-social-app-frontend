"use client";

import styles from "@/styles/profile.module.css";
import PostedCard from "@/components/PostedCard";
import PostCardModal from "@/components/PostCardModal";
import PostInputBtn from "@/components/PostInputBtn";
import ProfileInfoSection from "@/components/ProfileInfoSection";
import ProfileFriendSection from "@/components/ProfileFriendSection";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/userReducer";
import { useHeader } from "@/contexts/HeaderContext";

export default function Profile({ params }) {
  const { id } = use(params);

  const [profileData, setProfileData] = useState(null);
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
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);

  const { isSearchListOpen, isDropdownOpen, isFriendRequestOpen } = useHeader();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfileData() {
      const token = localStorage.getItem("token");

      try {
        const profileRes = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!profileRes.ok) {
          console.error("Failed to fetch user data:", profileRes.status);
          throw new Error("User not found or unauthorized.");
        }
        const profileData = await profileRes.json();
        setProfileData(profileData.user);
        setIsFriend(user.friends.includes(profileData.user._id));
        setHasFollower(user.followers.includes(profileData.user._id));
        setIsFollower(user.following.includes(profileData.user._id));
        setIsMyProfile(user.publicId === profileData.user.publicId);

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
    fetchProfileData();
  }, [id, newPost, refreshPost]);

  const handlePostDeleted = (deletedPostId) => {
    setPostsList((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  const handleRefresh = () => {
    setRefreshPost(!refreshPost);
  };

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

        dispatch(updateUser({ friendRequests: [...user.friendRequests, id] }));
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
        setIsFollower(!isFollower);

        const updatedFollowing = isFollower ? user.following.filter((userId) => userId !== id) : [...user.following, id];

        dispatch(updateUser({ following: updatedFollowing }));
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

  const handleUpdateInfo = async (field, value) => {
    const token = localStorage.getItem("token");

    const updateData = {};

    if (field === "bio") {
      updateData.bio = value;
    } else if (field === "job") {
      updateData.job = value;
    } else if (field === "location") {
      updateData.location = value;
    } else if (field === "website") {
      updateData.website = value;
    } else if (field === "avatar") {
      updateData.avatar = value;
    } else if (field === "backgroundImage") {
      updateData.backgroundImage = value;
    }

    try {
      const response = await fetch("http://localhost:3000/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setRefreshPost(!refreshPost);
      }
    } catch (err) {
      console.error("Error during updating profile infos:", err);
    }
  };

  if (error) {
    return <p>Profil introuvable</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

  const openPostCardModal = () => setIsPostCardModalOpen(true);
  const closePostCardModal = () => setIsPostCardModalOpen(false);

  const posts = postsList.map((post) => (
    <PostedCard
      key={post._id}
      postId={post._id}
      author={profileData}
      content={post.content}
      date={post.createdAt}
      onPostDeleted={handlePostDeleted}
      onRefresh={handleRefresh}
    />
  ));

  return (
    <div
      className={styles.page}
      style={{ position: "relative", zIndex: isSearchListOpen || isDropdownOpen || isFriendRequestOpen ? -1 : 1 }}
    >
      <div className={styles.header}>
        <Image src={profileData.profile.avatar} width={150} height={150} alt={`${profileData.profile.firstname} pic`} priority />
        <p>ProfilePage {profileData.profile.firstname}</p>
        <div className={styles.socialBtn}>
          <div>
            {followMessage && <p style={{ color: "green" }}>{followMessage}</p>}
            {followErrorMessage && <p style={{ color: "red" }}>{followErrorMessage}</p>}
            {isMyProfile ? (
              <p>This is your profile</p>
            ) : isFriend ? (
              <p>You are friends with this person</p>
            ) : (
              <button onClick={handleFollow}>{isFollower ? "Unfollow this person" : "Follow this person"}</button>
            )}
            {isFollower && <p>You follow this guy</p>}
            {hasFollower && <p>You are follow by this guy</p>}
          </div>
          <div>
            {friendRequestMessage && <p style={{ color: "green" }}>{friendRequestMessage}</p>}
            {friendRequestErrorMessage && <p style={{ color: "red" }}>{friendRequestErrorMessage}</p>}
            {!isFriend && !isMyProfile && (
              <button onClick={handleFriendRequest} className={styles.friendBtn}>
                Send a friend request
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.infosFlow}>
          <ProfileInfoSection
            firstname={profileData.profile.firstname}
            lastname={profileData.profile.lastname}
            bio={profileData.profile.bio}
            location={profileData.profile.location}
            email={profileData.email}
            website={profileData.profile.website}
            birthdate={profileData.profile.birthdate}
            job={profileData.profile.job}
            onUpdate={handleUpdateInfo}
          />
          <ProfileFriendSection firstname={profileData.profile.firstname} id={id} />
        </div>
        <div className={styles.postsFlow}>
          <PostInputBtn onOpenPostCardModal={openPostCardModal} placeholder={`Write a message to ${profileData.profile.firstname}`} />
          {isPostCardModalOpen && (
            <PostCardModal
              onClosePostCardModal={closePostCardModal}
              onNewPost={() => setNewPost(!newPost)}
              placeholder={`Write a message to ${profileData.profile.firstname}`}
            />
          )}
          {postsList.length > 0 ? posts : <p>No posts available.</p>}
        </div>
      </div>
    </div>
  );
}
