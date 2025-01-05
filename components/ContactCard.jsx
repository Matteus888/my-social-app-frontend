import styles from "../styles/contactCard.module.css";
import Image from "next/image";

export default function ContactCard() {
  return (
    <div className={styles.card}>
      <Image src="/Surfer.png" alt="Matt Profile Pic" width={30} height={30} />
      <p>Matt name</p>
    </div>
  );
}
