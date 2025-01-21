"use client";

import styles from "@/styles/settings.module.css";
import { useSelector } from "react-redux";
import { use } from "react";

export default function Setting({ params }) {
  const { id } = use(params);

  const user = useSelector((state) => state.user.value);

  return <div className={styles.page}>{user.firstname}'s settings page</div>;
}
