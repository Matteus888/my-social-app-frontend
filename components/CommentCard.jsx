import styles from "@/styles/commentCard.module.css";
import Image from "next/image";

const moment = require("moment");

export default function CommentCard({ avatar, firstname, lastname, content, date }) {
  const formattedDate = (date) => {
    const now = moment();
    const postDate = moment(date);
    const duration = moment.duration(now.diff(postDate));
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();

    if (minutes < 60) {
      return `${Math.floor(minutes)} min`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} h`;
    } else if (days < 7) {
      return `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago`;
    } else {
      return postDate.format("MMMM Do YYYY");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image src={avatar} alt={`${firstname} profile pic`} width={30} height={30} style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.commentBubble}>
          <p className={styles.name}>{`${firstname} ${lastname}`}</p>
          <p className={styles.content}>{content}</p>
        </div>
        <p className={styles.date}>{formattedDate(date)}</p>
      </div>
    </div>
  );
}
