"use client";

import styles from "@/styles/postCardModal.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PostCardModal({ onClosePostCardModal, onNewPost }) {
  const [content, setContent] = useState("");

  const user = useSelector((state) => state.user.value);
  // console.log(user.token);

  const isDisabled = content.trim() === "";

  const handleSubmitPost = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content, author: user.token }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          console.log("Post recorded", data);
        }
      }
    } catch (error) {
      console.error("Error during post recording:", error);
    }
    onNewPost();
    onClosePostCardModal();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClosePostCardModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Create a post</h3>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faXmark} className={styles.icon} onClick={onClosePostCardModal} />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.mainContainer}>
          <Link href="/profile" name="Profile">
            <div className={styles.userCard}>
              <Image src={user.avatar} alt={`${user.firstname} profile pic`} width={40} height={40} />
              <p className={styles.name}>{user.firstname}</p>
            </div>
          </Link>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="postContent"
              placeholder={`What's up ${user.firstname}`}
              maxLength={400}
            />
            <button
              type="submit"
              className={`${styles.submitBtn} ${isDisabled ? styles.disabled : styles.active}`}
              disabled={isDisabled}
              onClick={handleSubmitPost}
            >
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
