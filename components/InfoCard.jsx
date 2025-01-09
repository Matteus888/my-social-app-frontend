import styles from "../styles/infoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function InfoCard({ content }) {
  return (
    <div className={styles.info}>
      <div className={styles.info__icon}>
        <FontAwesomeIcon icon={faCircleInfo} width={20} height={20} style={{ color: "white" }} />
      </div>
      <p className={styles.info__text}>{content}</p>
    </div>
  );
}
