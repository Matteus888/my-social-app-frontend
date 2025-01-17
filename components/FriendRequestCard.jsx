import styles from "../styles/friendRequestCard.module.css";
import Image from "next/image";

export default function FriendRequestCard({ name, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.friend}>
        <Image src={image} alt={`${name} profile pic`} width={30} height={30} />
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.btnContainer}>
        <button className={`${styles.btn} ${styles.acceptBtn}`}>Accept</button>
        <button className={`${styles.btn} ${styles.ignoreBtn}`}>Ignore</button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
