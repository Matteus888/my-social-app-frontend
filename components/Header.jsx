"use client";

import styles from "../styles/header.module.css";

import SearchBar from "./SearchBar";
import FriendRequestCard from "./FriendRequestCard";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "@/store/userReducer";
import { useHeader } from "@/contexts/FriendContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFriendRequestOpen, setIsFriendRequestOpen] = useState(false);

  const { newFriend, setNewFriend } = useHeader();

  const dropdownRef = useRef(null);
  const friendRequestRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  if (!user.firstname) return;

  // Pour récupérer les demandes d'amis
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const res = await fetch("https://my-social-app-backend.vercel.app/users/friend-requests", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  // Pour se déconnecter
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsFriendRequestOpen(false);

    try {
      await fetch("https://my-social-app-backend.vercel.app/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
      setTimeout(() => {
        dispatch(logout());
      }, 500);
    } catch (err) {
      console.error("Signout failed:", err);
    }
  };

  // Pour accepter ou refuser une demande d'ami
  const handleFriendRequest = async (userId, action) => {
    try {
      const res = await fetch(`https://my-social-app-backend.vercel.app/users/${userId}/friend-request/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to process friend request.");
      }
      const data = await res.json();
      setNewFriend(!newFriend);
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.publicId !== userId));
      dispatch(updateUser({ friends: [...user.friends, userId] }));
      dispatch(updateUser({ friendRequests: user.friendRequests.filter((id) => id !== userId) }));
    } catch (error) {
      console.error("Error handling friend request1:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" name="Home" className={styles.logo}>
          <Image src="/logo.svg" width={40} height={40} alt="Logo" priority />
        </Link>
        <SearchBar placeholder="Search people" />
      </div>
      <h1 className={styles.title}>My Social App</h1>

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
          <div className={styles.avatar}>
            <Image src={user.avatar} width={40} height={40} style={{ objectFit: "cover" }} alt="User Avatar" priority />
          </div>
          <div className={styles.chevronContainer}>
            <FontAwesomeIcon icon={faChevronDown} className={styles.chevronIcon} />
          </div>
        </div>
        {/* Menu options */}
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu} ref={dropdownRef}>
            <li className={styles.dropdownCard}>
              <div className={styles.avatarCard}>
                <Image src={user.avatar} width={25} height={25} style={{ objectFit: "cover" }} alt="User Avatar" />
              </div>
              <Link href={`/profile/${user.publicId}`} className={styles.dropdownItem}>
                {user.firstname}'s Profile
              </Link>
            </li>
            <li className={styles.dropdownCard}>
              <FontAwesomeIcon icon={faGear} className={styles.dropdownIcon} />
              <Link href="#" className={styles.dropdownItem}>
                Settings Page in dev
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
