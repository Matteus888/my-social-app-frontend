import styles from "../../styles/login.module.css";
import InfoCard from "@/components/InfoCard";

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>My Social App</h1>
        <InfoCard content="You must login to continue." />
        <div className={styles.loginContainer}>
          <p className={styles.loginTitle}>Connect to My Social App</p>
          <div className={styles.infoAlert}>
            <p>You must login to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
