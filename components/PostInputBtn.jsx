import styles from "@/styles/postInputBtn.module.css";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PostInputBtn({ onOpenPostCardModal, placeholder }) {
  const user = useSelector((state) => state.user.value);

  return (
    <div className={styles.container}>
      <Link href={`/profile/${user.publicId}`} name="Profile" className={styles.avatar}>
        <Image src={user.avatar} width={44} height={44} alt="User avatar" style={{ objectFit: "cover" }} />
      </Link>
      <button className={styles.inputBtn} onClick={onOpenPostCardModal}>
        {placeholder}
      </button>
    </div>
  );
}
