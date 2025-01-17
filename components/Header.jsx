"use client";

import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/userReducer";
import { useEffect, useRef, useState } from "react";
import { useHeader } from "@/contexts/HeaderContext";

export default function Header() {
  const [friendRequests, setFriendRequests] = useState();
  const { isDropdownOpen, setIsDropdownOpen } = useHeader();
  const dropdownRef = useRef(null);
  const router = useRouter();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    router.push("/login");
    setTimeout(() => {
      dispatch(logout());
    }, 500);
  };

  // Récupérer friendRequests
  // Boutons Accept /users/:id/friend-request/accept
  // Boutons Reject /users/:id/friend-request/reject

  // Pour récupérer les demandes d'amis A TESTER
  // useEffect(() => {
  //   async function fetchFriendRequests() {
  //     const token = localStorage.getItem("token");

  //     try {
  //       const res = await fetch("http://localhost:3000/users/friend-requests", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token ? `Bearer ${token}` : "",
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch friend requests.");
  //       }

  //       const data = await res.json();
  //       setFriendRequests(data.friendRequests);
  //     } catch (error) {
  //       console.error("Error fetching friend requests:", error);
  //     }
  //   }

  //   fetchFriendRequests();
  // }, []);

  // Gestion du clic à l'extérieur pour fermer le menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" name="Home" className={styles.logo}>
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
      </Link>
      <h1>My Social App</h1>

      <div className={styles.options}>
        <Link href="#" name="notifications">
          <FontAwesomeIcon icon={faBell} style={{ color: "#171717", fontSize: "40px" }} />
        </Link>
        <div className={styles.imageContainer} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Image className={styles.avatar} src={user.avatar} width={40} height={40} alt="User Avatar" />
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </div>
        </div>
        {/* Menu déroulant */}
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
