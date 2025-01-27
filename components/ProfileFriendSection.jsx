import styles from "@/styles/profileFriendSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfileFriendSection({ firstname, friendsList, friendsInCommon, isMyProfile }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          {firstname}'s friends{" "}
          {friendsInCommon > 0 && !isMyProfile && <span className={styles.commonFriends}>({friendsInCommon} shared)</span>}
        </p>
        <p className={styles.number}>
          {friendsList.length} friend{friendsList.length > 1 && "s"}
        </p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.friendsContainer}>
        {friendsList.length > 0 ? (
          friendsList.map((friend, i) => (
            <div key={i} className={styles.friendCard}>
              <Link href={`/profile/${friend.publicId}`} className={styles.link}>
                <Image src={friend.profile.avatar} width={70} height={70} alt={`${friend.firstname} profile pic`} />
                <p className={styles.name}>
                  {friend.profile.firstname} {friend.profile.lastname}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No friend added</p>
        )}
      </div>
    </div>
  );
}
