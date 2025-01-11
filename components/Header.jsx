"use client";

import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/userReducer";

export default function Header() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <Link href="/" name="Home">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
      </Link>
      <h1>My Social App</h1>

      <div className={styles.options}>
        <Link href="#" name="notifications">
          <FontAwesomeIcon icon={faBell} style={{ color: "#171717", fontSize: "40px" }} />
        </Link>
        <Menu as="div" className={styles.menuContainer}>
          <Menu.Button className={styles.imageContainer}>
            <Image className={styles.avatar} src={user.avatar} width={40} height={40} alt="User Avatar" />
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            </div>
          </Menu.Button>
          {/* Menu déroulant */}
          <Menu.Items className={styles.dropdownMenu}>
            <Menu.Item>
              {({ active }) => (
                <Link href="/profile" className={`${styles.dropdownItem} ${active ? styles.dropdownItemActive : ""}`}>
                  My Profil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/settings" className={`${styles.dropdownItem} ${active ? styles.dropdownItemActive : ""}`}>
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/login" className={`${styles.dropdownItem} ${active ? styles.dropdownItemActive : ""}`} onClick={handleLogout}>
                  Disconnect
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
