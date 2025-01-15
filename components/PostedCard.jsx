import styles from "@/styles/postedCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComments } from "@fortawesome/free-regular-svg-icons";

const moment = require("moment");

export default function PostedCard({ author, date, content }) {
  const formattedDate = moment(date).format("MMMM Do YYYY, hh:mm a");
  console.log(author._id);
  return (
    <div className={styles.container}>
      <div className={styles.postedHeader}>
        <Image src={author.profile.avatar} alt={`${author.profile.firstname} profile pic`} width={40} height={40} />
        <div className={styles.postedHeaderText}>
          <Link href={`/profile/${author._id}`} className={styles.name}>
            {author.profile.firstname} {author.profile.lastname}
          </Link>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <div className={styles.postedHeaderIcon}>
          <FontAwesomeIcon icon={faXmark} className={styles.icon} />
        </div>
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
    </div>
  );
}
