import styles from "@/styles/postedCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const moment = require("moment");

export default function PostedCard({ author, date, content, postId, onPostDeleted }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const user = useSelector((state) => state.user.value);

  const formattedDate = moment(date).format("MMMM Do YYYY, hh:mm a");

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Post deleted:", data);
        if (onPostDeleted) {
          onPostDeleted(postId);
        }
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error during deleting post:", error);
    }
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.postedHeader}>
        <Image src={author.profile.avatar} alt={`${author.profile.firstname} profile pic`} width={40} height={40} />
        <div className={styles.postedHeaderText}>
          <Link href={`/profile/${author.publicId}`} className={styles.name}>
            {author.profile.firstname} {author.profile.lastname}
          </Link>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        {author.publicId === user.publicId && (
          <div className={styles.postedHeaderIcon} onClick={openDeleteModal}>
            <FontAwesomeIcon icon={faXmark} className={styles.icon} />
          </div>
        )}
      </div>
      <div className={styles.postedContent}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.commentCountSection}>
        <div>Liked 5</div>
        <div>10 comments</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.commentSection}>
        <div className={styles.commentBtn}>
          <FontAwesomeIcon icon={faThumbsUp} className={styles.commentIcon} />
          <p className={styles.commentBtnText}>I like</p>
        </div>
        <div className={styles.commentBtn}>
          <FontAwesomeIcon icon={faComments} className={styles.commentIcon} />
          <p className={styles.commentBtnText}>Comment</p>
        </div>
      </div>
      {/* Modal de confirmation */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this post?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDeletePost} className={`${styles.btn} ${styles.confirmBtn}`}>
                Yes
              </button>
              <button onClick={closeDeleteModal} className={`${styles.btn} ${styles.cancelBtn}`}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
