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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFolderPlus, faFolderMinus, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function Profile({ params }) {
  const { id } = use(params);

  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState(null);
  const [postsList, setPostsList] = useState([]);
  const [error, setError] = useState(false);
  const [friendRequestMessage, setFriendRequestMessage] = useState(null);
  const [friendRequestErrorMessage, setFriendRequestErrorMessage] = useState(null);
  const [isFriend, setIsFriend] = useState(null);
  const [isFollower, setIsFollower] = useState(null);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [commonFriendsCount, setCommonFriendsCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { isSearchListOpen, isDropdownOpen, isFriendRequestOpen, newFriend, setNewFriend } = useHeader();

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
        setFriendData(profileData.user.social.friends);
        setIsFriend(user.friends.includes(profileData.user.publicId));
        setIsFollower(user.following.includes(profileData.user.publicId));
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
  }, [id, newPost, refreshPost, newFriend]);

  useEffect(() => {
    if (friendData && user.friends) {
      // Extraire les publicId des amis dans friendData
      const friendPublicIds = friendData.map((friend) => friend.publicId);
      // Calcul des amis en commun
      const commonFriends = user.friends.filter((friendId) => friendPublicIds.includes(friendId));
      setCommonFriendsCount(commonFriends.length);
    }
  }, [friendData, user.friends]);

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

  const handleDeleteFriend = async (friendId) => {
    setIsConfirmationModalOpen(false);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/users/${friendId}/unfriend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFriendData((prev) => prev.filter((friend) => friend.publicId !== friendId));
        setIsFriend(false);
        setFriendRequestMessage(data.message);
        setNewFriend(!newFriend);
        dispatch(updateUser({ friends: user.friends.filter((id) => id !== friendId) }));
      }
      setFriendRequestErrorMessage(data.error);
    } catch (err) {
      console.error("Error removing friend:", err);
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

  if (error) {
    return <p>Profil introuvable</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // A adapter pour s'occuper aussi de backgroundImg
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Veuillez sélectionner une image avant de l'envoyer.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("field", "avatar"); // ou "backgroundImage"

    try {
      const response = await fetch("http://localhost:3000/users/profile/image", {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during picture upload.");
      }

      const data = await response.json();
      dispatch(updateUser({ avatar: data.imageUrl }));
      handleRefresh();
      alert("Image mise à jour avec succès !");
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Error during picture upload:", err);
    }
  };

  return (
    <div
      className={styles.page}
      style={{ position: "relative", zIndex: isSearchListOpen || isDropdownOpen || isFriendRequestOpen ? -1 : 1 }}
    >
      <div className={styles.header}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.headerInfo}>
          <div className={styles.profileInfoContainer}>
            <Image
              className={styles.profileAvatar}
              src={profileData.profile.avatar}
              width={180}
              height={180}
              alt={`${profileData.profile.firstname} pic`}
              priority
            />
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={handleImageUpload} disabled={!selectedImage}>
                Envoyer l'image
              </button>
            </div>

            <div className={styles.profileInfo}>
              <p className={styles.profileName}>
                {profileData.profile.firstname} {profileData.profile.lastname}
              </p>
              <p className={styles.profileNbFriends}>
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
      {/* Confirmation Modals */}
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
      {friendRequestMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{friendRequestMessage}</p>
            <div className={styles.modalActions}>
              <button onClick={() => setFriendRequestMessage(null)} className={`${styles.btn} ${styles.okBtn}`}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {friendRequestErrorMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{friendRequestErrorMessage}</p>
            <div className={styles.modalActions}>
              <button onClick={() => setFriendRequestErrorMessage(null)} className={`${styles.btn} ${styles.okBtn}`}>
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
            onRefresh={handleRefresh}
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
