import Link from "next/link";
import styles from "../styles/contactCard.module.css";
import Image from "next/image";

export default function ContactCard({ name, image, imgWidth, imgHeight, fontSize, link }) {
  return (
    <Link href={link} className={styles.card}>
      <Image src={image} alt={`${name} profile pic`} width={imgWidth} height={imgHeight} />
      <p className={styles.name} style={{ fontSize: fontSize + "px" }}>
        {name}
      </p>
    </Link>
  );
}
