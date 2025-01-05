import styles from "../styles/contactsSection.module.css";
import ContactCard from "./ContactCard";

export default function ContactsSection() {
  let cards;
  for (let i = 0; i < 20; i++) {
    cards = <ContactCard />;
  }

  return (
    <aside className={styles.contacts}>
      <h2>Contacts</h2>
      {cards}
    </aside>
  );
}
