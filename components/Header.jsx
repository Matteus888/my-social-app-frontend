"use client";

import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import FriendRequestCard from "./FriendRequestCard";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/userReducer";
import { useHeader } from "@/contexts/HeaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [friendRequests, setFriendRequests] = useState([]);

  const { isFriendRequestOpen, setIsFriendRequestOpen } = useHeader();
  const { isDropdownOpen, setIsDropdownOpen } = useHeader();
  const { newFriend, setNewFriend } = useHeader();

  const dropdownRef = useRef(null);
  const friendRequestRef = useRef(null);

  const router = useRouter();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // Pour se déconnecter
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    setIsFriendRequestOpen(false);
    router.push("/login");
    setTimeout(() => {
      dispatch(logout());
    }, 500);
  };

  // Pour récupérer les demandes d'amis
  useEffect(() => {
    const fetchFriendRequests = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3000/users/friend-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch friend requests.");
        }

        const data = await res.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, []);

  // Pour accepter ou refuser une demande d'ami
  const handleFriendRequest = async (userId, action) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/friend-request/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to process friend request.");
      }
      const data = await res.json();
      setNewFriend(!newFriend);
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.publicId !== userId));
    } catch (error) {
      console.error("Error handling friend request1:", error);
    }
  };

  // Gestion du clic à l'extérieur pour fermer les menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      if (friendRequestRef.current && !friendRequestRef.current.contains(event.target) && isFriendRequestOpen) {
        setIsFriendRequestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isFriendRequestOpen, setIsDropdownOpen, setIsFriendRequestOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" name="Home" className={styles.logo}>
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
      </Link>
      <h1>My Social App</h1>

      <div className={styles.options}>
        {/* Bouton des demandes d'amis */}
        <div
          className={styles.notifContainer}
          onClick={() => {
            setIsFriendRequestOpen(!isFriendRequestOpen);
            setIsDropdownOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faBell} className={styles.bellIcon} />
          {friendRequests.length > 0 && <div className={styles.iconContainer}>{friendRequests.length}</div>}
        </div>
        {/* Liste des demandes d'amis */}
        {isFriendRequestOpen && (
          <div className={styles.friendRequestList} ref={friendRequestRef}>
            {friendRequests.map((friend, i) => (
              <FriendRequestCard
                key={i}
                name={`${friend.profile.firstname} ${friend.profile.lastname}`}
                image={friend.profile.avatar}
                onAccept={async () => await handleFriendRequest(friend.publicId, "accept")}
                onReject={async () => await handleFriendRequest(friend.publicId, "reject")}
              />
            ))}
          </div>
        )}

        <div
          className={styles.avatarContainer}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            setIsFriendRequestOpen(false);
          }}
        >
          <Image className={styles.avatar} src={user.avatar} width={40} height={40} alt="User Avatar" />
          <div className={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronDown} className={styles.chevronIcon} />
          </div>
        </div>
        {/* Menu options */}
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu} ref={dropdownRef}>
            <li className={styles.dropdownCard}>
              <Image className={styles.avatarCard} src={user.avatar} width={20} height={20} alt="User Avatar" />
              <Link href={`/profile/${user.publicId}`} className={styles.dropdownItem}>
                {user.firstname}'s Profile
              </Link>
            </li>
            <li className={styles.dropdownCard}>
              <FontAwesomeIcon icon={faGear} className={styles.dropdownIcon} />
              <Link href="/settings" className={styles.dropdownItem}>
                Settings
              </Link>
            </li>
            <li className={styles.dropdownCard}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.dropdownIcon} />
              <Link href="/login" className={styles.dropdownItem} onClick={handleLogout}>
                Disconnect
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
