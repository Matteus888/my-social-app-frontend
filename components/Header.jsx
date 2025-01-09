"use client";

import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <header className={styles.header}>
      <Link href="/" name="Home">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
      </Link>
      <h1>My Social App</h1>

      <div className={styles.options}>
        <FontAwesomeIcon icon={faBell} width={30} height={30} style={{ color: "#171717" }} />
        <Link href="/profile" name="Profile">
          <FontAwesomeIcon icon={faUser} width={30} height={30} style={{ color: "#171717" }} />
          {user.firstname}
        </Link>
      </div>
    </header>
  );
}
