import styles from "@/styles/postInputBtn.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PostInputBtn() {
  const user = useSelector((state) => state.user.value);

  return (
    <div className={styles.container}>
      <Link href="/profile" name="Profile" className={styles.avatar}>
        <Image src={user.avatar} width={44} height={44} alt="User avatar" />
      </Link>
      <button className={styles.inputBtn}>What's up {user.firstname} ?</button>
    </div>
  );
}
