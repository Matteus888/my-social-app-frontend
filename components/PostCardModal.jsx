import styles from "@/styles/postCardModal.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PostCardModal({ onClosePostCardModal }) {
  const [content, setContent] = useState("");

  const user = useSelector((state) => state.user.value);

  const isDisabled = content.trim() === "";

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
          <form action="submit">
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="postContent"
              placeholder={`What's up ${user.firstname}`}
              maxLength={400}
            />
            <button type="submit" className={`${styles.submitBtn} ${isDisabled ? styles.disabled : styles.active}`} disabled={isDisabled}>
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
