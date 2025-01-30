import styles from "@/styles/postedCard.module.css";

import CommentCard from "./CommentCard";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons";

const moment = require("moment");

export default function PostedCard({ author, date, content, postId, likes, onPostDeleted, onRefresh }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState(false);

  const user = useSelector((state) => state.user.value);

  const formattedDate = (date) => {
    const now = moment();
    const postDate = moment(date);
    const duration = moment.duration(now.diff(postDate));
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();

    if (minutes < 60) {
      return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago`;
    } else if (days < 7) {
      return `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago`;
    } else {
      return postDate.format("MMMM Do YYYY, hh:mm a");
    }
  };

  // Charger tous les commentaires des posts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCommentsList(data.comments.reverse());
        }
      } catch (err) {
        console.error("Error during getting comments:", err);
      }
    };

    fetchComments();
  }, [newComment]);

  // Supprimer une publication
  const handleDeletePost = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (onPostDeleted) {
          onPostDeleted(postId);
        }
        setCommentsList([]);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error during deleting post:", error);
    }
  };

  // Ajouter ou supprimer un like
  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        onRefresh();
      } else if (res.status === 403) {
        setErrorMessage("You cannot like your own post");
      }
    } catch (err) {
      console.error("Error during liking post:", err);
    }
  };

  // Poster un commentaire à propos d'une publication
  const handlePostComment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: commentValue }),
      });
      if (res.ok) {
        const data = await res.json();
        setCommentValue("");
        setNewComment(!newComment);
      }
    } catch (err) {
      console.error("Error during sending comment:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.postedHeader}>
        <div className={styles.avatar}>
          <Image
            src={author.profile.avatar}
            alt={`${author.profile.firstname} profile pic`}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.postedHeaderText}>
          <Link href={`/profile/${author.publicId}`} className={styles.name}>
            {author.profile.firstname} {author.profile.lastname}
          </Link>
          <p className={styles.date}>{formattedDate(date)}</p>
        </div>
        {author.publicId === user.publicId && (
          <div className={styles.postedHeaderIcon} onClick={() => setIsDeleteModalOpen(true)}>
            <FontAwesomeIcon icon={faXmark} className={styles.icon} />
          </div>
        )}
      </div>
      <div className={styles.postedContent}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.commentCountSection}>
        <div>
          {likes ? (
            <>
              <FontAwesomeIcon icon={faThumbsUp} className={styles.thumbUp} />
              {likes}
            </>
          ) : null}
        </div>
        {/* Modal d'erreur */}
        {errorMessage && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>{errorMessage}</p>
              <div className={styles.modalActions}>
                <button onClick={() => setErrorMessage("")} className={`${styles.btn} ${styles.okBtn}`}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        <div onClick={() => setIsCommentsOpen(!isCommentsOpen)} className={styles.commentTxt}>
          {commentsList.length > 0 ? `${commentsList.length} comment${commentsList.length > 1 ? "s" : ""}` : null}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.commentSection}>
        <div className={styles.commentBtn} onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} className={styles.commentIcon} />
          <p className={styles.commentBtnText}>I like</p>
        </div>
        <div
          className={`${styles.commentBtn} ${isCommentsOpen ? styles.commentBtnOpen : ""}`}
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <FontAwesomeIcon icon={faComments} className={styles.commentIcon} />
          <p className={styles.commentBtnText}>Comment</p>
        </div>
      </div>
      {isCommentsOpen && (
        <div className={styles.commentContainer}>
          <div className={styles.line}></div>
          <div className={styles.commentWrapper}>
            {commentsList.map((comment, i) => (
              <CommentCard
                key={i}
                avatar={comment.user.profile.avatar}
                firstname={comment.user.profile.firstname}
                lastname={comment.user.profile.lastname}
                content={comment.content}
                date={comment.createdAt}
              />
            ))}
          </div>
          <div className={styles.line}></div>
          <div className={styles.inputContainer}>
            <div className={styles.inputAvatar}>
              <Image src={user.avatar} alt={`${user.firstname} profile pic`} width={30} height={30} style={{ objectFit: "cover" }} />
            </div>
            <input
              type="text"
              className={styles.input}
              placeholder="Write your comment..."
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <FontAwesomeIcon icon={faPaperPlane} className={styles.postBtn} onClick={handlePostComment} />
          </div>
        </div>
      )}
      {/* Modal de confirmation */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this post?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDeletePost} className={`${styles.btn} ${styles.confirmBtn}`}>
                Yes
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className={`${styles.btn} ${styles.cancelBtn}`}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
