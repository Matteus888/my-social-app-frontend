"use client";

import styles from "@/styles/profile.module.css";

import PostedCard from "@/components/PostedCard";
import PostCardModal from "@/components/PostCardModal";
import PostInputBtn from "@/components/PostInputBtn";
import ProfileInfoSection from "@/components/ProfileInfoSection";
import ProfileFriendSection from "@/components/ProfileFriendSection";
import UpdateImageModal from "@/components/UpdateImageModal";

import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/store/userReducer";
import { useHeader } from "@/contexts/FriendContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFolderPlus, faFolderMinus, faUserCheck, faCamera } from "@fortawesome/free-solid-svg-icons";

export default function Profile({ params }) {
  const { id } = use(params);

  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState(null);
  const [postsList, setPostsList] = useState([]);
  const [message, setMessage] = useState(null);
  const [isFriend, setIsFriend] = useState(null);
  const [isFollower, setIsFollower] = useState(null);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [commonFriendsCount, setCommonFriendsCount] = useState(0);
  const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] = useState(false);
  const [isUpdateBcgModalOpen, setIsUpdateBcgModalOpen] = useState(false);

  const { newFriend, setNewFriend } = useHeader();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // Chargement des infos utilisateurs et de ses posts
  useEffect(() => {
    async function fetchProfileData() {
      try {
        const profileRes = await fetch(`https://my-social-app-backend.vercel.app/users/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!profileRes.ok) {
          console.error("Failed to fetch user data:", profileRes.status);
          throw new Error("User not found or unauthorized.");
        }
        const profileData = await profileRes.json();
        setProfileData(profileData.user);
        setFriendData(profileData.user.social.friends);
        setIsFriend(user.friends.includes(profileData.user.publicId));
        setIsFollower(user.following.includes(profileData.user.publicId));
        setIsMyProfile(user.publicId === profileData.user.publicId);

        const postsRes = await fetch(`https://my-social-app-backend.vercel.app/users/${id}/posts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!postsRes.ok) {
          console.error("Failed to fetch user posts:", postsRes.status);
          throw new Error("Could not fetch posts.");
        }
        const postsData = await postsRes.json();
        setPostsList(postsData.posts.reverse());
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfileData();
  }, [id, newPost, refreshPost, newFriend]);

  // Calculer les amis en commun
  useEffect(() => {
    if (friendData && user.friends) {
      const friendPublicIds = friendData.map((friend) => friend.publicId);
      const commonFriends = user.friends.filter((friendId) => friendPublicIds.includes(friendId));
      setCommonFriendsCount(commonFriends.length);
    }
  }, [friendData, user.friends]);

  // Supprimer un post
  const handlePostDeleted = (deletedPostId) => {
    setPostsList((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  // Envoyer une demande d'ami
  const handleFriendRequest = async () => {
    try {
      const res = await fetch(`https://my-social-app-backend.vercel.app/users/${id}/friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const successData = await res.json();
        setMessage(successData.message);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to the server");
    }
  };

  // Supprimer une amitié
  const handleDeleteFriend = async (friendId) => {
    setIsConfirmationModalOpen(false);
    try {
      const res = await fetch(`https://my-social-app-backend.vercel.app/users/${friendId}/unfriend`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setFriendData((prev) => prev.filter((friend) => friend.publicId !== friendId));
        setIsFriend(false);
        setMessage(data.message);
        setNewFriend(!newFriend);
        dispatch(updateUser({ friends: user.friends.filter((id) => id !== friendId) }));
      }
      setMessage(data.error);
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  // Suivre ou ne plus suivre un autre utilisateur
  const handleFollow = async () => {
    try {
      const res = await fetch(`https://my-social-app-backend.vercel.app/users/${id}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const successData = await res.json();
        console.log(successData.message);
        setIsFollower(!isFollower);

        const updatedFollowing = isFollower ? user.following.filter((userId) => userId !== id) : [...user.following, id];

        dispatch(updateUser({ following: updatedFollowing }));
      } else {
        const errorData = await res.json();
        console.error(errorData.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Mettre à jour les images de profils
  const handleImageUpload = async (file, field) => {
    if (!file) {
      setMessage("Please select an image before sending.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("field", field); // ou "backgroundImage"

    try {
      const response = await fetch("https://my-social-app-backend.vercel.app/users/profile/image", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during picture upload.");
      }

      const data = await response.json();
      dispatch(updateUser({ [field]: data.imageUrl }));
      setRefreshPost(!refreshPost);
      setMessage("Picture successfully updated !");

      if (field === "avatar") {
        setIsUpdateAvatarModalOpen(false);
      } else if (field === "backgroundImage") {
        setIsUpdateBcgModalOpen(false);
      }
    } catch (err) {
      console.error("Error during picture upload:", err);
    }
  };

  // Liste des publications
  const posts = postsList.map((post) => (
    <PostedCard
      key={post._id}
      postId={post._id}
      author={profileData}
      content={post.content}
      date={post.createdAt}
      onPostDeleted={handlePostDeleted}
      onRefresh={() => setRefreshPost(!refreshPost)}
    />
  ));

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.backgroundImageContainer}>
          <div className={styles.backgroundImage}>
            {profileData.profile.backgroundImage ? (
              <Image
                src={profileData.profile.backgroundImage}
                width={1000}
                height={400}
                style={{ objectFit: "cover" }}
                alt={`${profileData.profile.firstname} background pic`}
                priority
              />
            ) : (
              <div className={styles.backgroundTxt}>
                <p>Add a background image here</p>
              </div>
            )}
          </div>
          {isMyProfile && (
            <div className={styles.backgroundImageBtn} onClick={() => setIsUpdateBcgModalOpen(true)}>
              <FontAwesomeIcon icon={faCamera} width={30} height={30} />
            </div>
          )}
        </div>
        {isUpdateBcgModalOpen && (
          <UpdateImageModal
            inputName="Change your background picture"
            onImageUpload={(file) => handleImageUpload(file, "backgroundImage")}
            onClose={() => setIsUpdateBcgModalOpen(false)}
            width="350px"
            radius="6px"
          />
        )}
        <div className={styles.headerInfo}>
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileAvatarContainer}>
              <div className={styles.profileAvatar}>
                {profileData.profile.avatar ? (
                  <Image
                    src={profileData.profile.avatar}
                    width={180}
                    height={180}
                    style={{ objectFit: "cover" }}
                    alt={`${profileData.profile.firstname} pic`}
                    priority
                  />
                ) : (
                  <div className={styles.avatarTxt}>
                    <p>Add avatar pic here</p>
                  </div>
                )}
              </div>
              {isMyProfile && (
                <div className={styles.cameraBtn} onClick={() => setIsUpdateAvatarModalOpen(true)}>
                  <FontAwesomeIcon icon={faCamera} width={25} height={25} />
                </div>
              )}
            </div>
            {isUpdateAvatarModalOpen && (
              <UpdateImageModal
                inputName="Change your avatar picture"
                onImageUpload={(file) => handleImageUpload(file, "avatar")}
                onClose={() => setIsUpdateAvatarModalOpen(false)}
                width="200px"
                radius="50%"
              />
            )}
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>
                {profileData.profile.firstname} {profileData.profile.lastname}
              </p>
              <p>
                {friendData.length} friend{friendData.length > 1 && "s"}
              </p>
              <div>Photo d'amis{commonFriendsCount}</div>
            </div>
          </div>
          <div className={styles.socialBtnContainer}>
            <div>
              {!isMyProfile &&
                !isFriend &&
                (!isFollower ? (
                  <button className={`${styles.socialBtn} ${styles.followBtn}`} onClick={handleFollow}>
                    <FontAwesomeIcon icon={faFolderPlus} width={20} height={20} />
                    <p>Follow</p>
                  </button>
                ) : (
                  <button className={`${styles.socialBtn} ${styles.followBtn}`} onClick={handleFollow}>
                    <FontAwesomeIcon icon={faFolderMinus} width={20} height={20} />
                    <p>Unfollow</p>
                  </button>
                ))}
            </div>
            <div>
              {!isMyProfile &&
                (!isFriend ? (
                  <button className={`${styles.socialBtn} ${styles.friendBtn}`} onClick={handleFriendRequest}>
                    <FontAwesomeIcon icon={faUserPlus} width={20} height={20} />
                    <p>Add friend</p>
                  </button>
                ) : (
                  <button className={`${styles.socialBtn} ${styles.friendBtn}`} onClick={() => setIsConfirmationModalOpen(true)}>
                    <FontAwesomeIcon icon={faUserCheck} width={20} height={20} />
                    <p>Friend</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modales de confirmation */}
      {isConfirmationModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>
              Are you sure you want to delete {profileData.profile.firstname} {profileData.profile.lastname} as friend ?
            </p>
            <div className={styles.modalActions}>
              <button onClick={() => handleDeleteFriend(id)} className={`${styles.btn} ${styles.confirmBtn}`}>
                Yes
              </button>
              <button onClick={() => setIsConfirmationModalOpen(false)} className={`${styles.btn} ${styles.cancelBtn}`}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{message}</p>
            <div className={styles.modalActions}>
              <button onClick={() => setMessage(null)} className={`${styles.btn} ${styles.okBtn}`}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.infosFlow}>
          <ProfileInfoSection
            publicId={profileData.publicId}
            firstname={profileData.profile.firstname}
            bio={profileData.profile.bio}
            location={profileData.profile.location}
            email={profileData.email}
            website={profileData.profile.website}
            birthdate={profileData.profile.birthdate}
            job={profileData.profile.job}
            onRefresh={() => setRefreshPost(!refreshPost)}
          />
          <ProfileFriendSection
            firstname={profileData.profile.firstname}
            friendsList={friendData}
            friendsInCommon={commonFriendsCount}
            isMyProfile={isMyProfile}
          />
        </div>
        <div className={styles.postsFlow}>
          <PostInputBtn
            onOpenPostCardModal={() => setIsPostCardModalOpen(true)}
            placeholder={`Write a message to ${profileData.profile.firstname}`}
          />
          {isPostCardModalOpen && (
            <PostCardModal
              onClosePostCardModal={() => setIsPostCardModalOpen(false)}
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
