import styles from "../styles/contactCard.module.css";
import Image from "next/image";

export default function ContactCard({ name, image }) {
  return (
    <div className={styles.card}>
      <Image src={image} alt={`${name} profile pic`} width={40} height={40} />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
