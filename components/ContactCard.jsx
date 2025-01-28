import Link from "next/link";
import styles from "../styles/contactCard.module.css";
import Image from "next/image";

export default function ContactCard({ name, image, imgWidth, imgHeight, fontSize, link }) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.avatar} style={{ width: imgWidth, height: imgHeight }}>
        <Image src={image} alt={`${name} profile pic`} width={imgWidth} height={imgHeight} style={{ objectFit: "cover" }} />
      </div>
      <p className={styles.name} style={{ fontSize: fontSize + "px" }}>
        {name}
      </p>
    </Link>
  );
}
