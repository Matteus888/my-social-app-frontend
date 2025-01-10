"use client";

import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
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
        <div className={styles.imageContainer} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image className={styles.avatar} src={user.avatar} width={40} height={40} alt="User Avatar" />
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </div>
        </div>
        {isMenuOpen && <DropdownMenu />}
      </div>
    </header>
  );
}
