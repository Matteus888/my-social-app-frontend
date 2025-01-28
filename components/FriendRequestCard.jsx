import styles from "../styles/friendRequestCard.module.css";
import Image from "next/image";

export default function FriendRequestCard({ name, image, onAccept, onReject }) {
  return (
    <div className={styles.card}>
      <div className={styles.friend}>
        <div className={styles.avatar}>
          <Image src={image} alt={`${name} profile pic`} width={35} height={35} style={{ objectFit: "cover" }} />
        </div>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.btnContainer}>
        <button className={`${styles.btn} ${styles.acceptBtn}`} onClick={onAccept}>
          Accept
        </button>
        <button className={`${styles.btn} ${styles.ignoreBtn}`} onClick={onReject}>
          Ignore
        </button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
