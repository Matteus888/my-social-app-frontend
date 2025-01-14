import styles from "../styles/contactsSection.module.css";
import ContactCard from "./ContactCard";

export default function ContactsSection({ isDropdownOpen }) {
  // Fetch GET all friends

  return (
    <div className={styles.contacts} style={{ position: "relative", zIndex: isDropdownOpen ? -1 : 1 }}>
      <h2 className={styles.title}>Contacts</h2>
      <ContactCard
        name="Matt Yeah"
        image="https://res.cloudinary.com/dzqy8gnmh/image/upload/v1736507142/my-social-app/user_profile/r7cfwapnvx8e68y9ndbr.png"
      />
      <ContactCard
        name="John"
        image="https://res.cloudinary.com/dzqy8gnmh/image/upload/v1736507142/my-social-app/user_profile/bwwdniezugfnqikmda0x.png"
      />
      <ContactCard
        name="Aurélie Poulette"
        image="https://res.cloudinary.com/dzqy8gnmh/image/upload/v1736507142/my-social-app/user_profile/avjelejrbqiwhgzb6cw2.png"
      />
      <ContactCard
        name="Billie"
        image="https://res.cloudinary.com/dzqy8gnmh/image/upload/v1736507142/my-social-app/user_profile/b9k6cgdztva8natoj0mc.png"
      />
    </div>
  );
}
