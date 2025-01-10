import styles from "../styles/contactsSection.module.css";
import ContactCard from "./ContactCard";

export default function ContactsSection() {
  return (
    <aside className={styles.contacts}>
      <h2 className={styles.title}>Contacts</h2>
      <ContactCard name="Matt" image="/users/man1.png" />
      <ContactCard name="John" image="/users/man2.png" />
      <ContactCard name="Jane" image="/users/woman1.png" />
      <ContactCard name="Billie" image="/users/man3.png" />
      <ContactCard name="William" image="/users/man4.png" />
      <ContactCard name="Giraffe Boy" image="/users/other1.png" />
      <ContactCard name="Kate" image="/users/woman2.png" />
      <ContactCard name="Jean-Eudes" image="/users/man5.png" />
      <ContactCard name="Koala Man" image="/users/other2.png" />
      <ContactCard name="Girl Power" image="/users/woman3.png" />
      <ContactCard name="Matt" image="/users/man1.png" />
      <ContactCard name="John" image="/users/man2.png" />
      <ContactCard name="Jane" image="/users/woman1.png" />
      <ContactCard name="Billie" image="/users/man3.png" />
      <ContactCard name="William" image="/users/man4.png" />
      <ContactCard name="Giraffe Boy" image="/users/other3.png" />
      <ContactCard name="Kate" image="/users/woman2.png" />
      <ContactCard name="Jean-Eudes" image="/users/man5.png" />
      <ContactCard name="Koala Man" image="/users/other4.png" />
      <ContactCard name="Girl Power" image="/users/woman3.png" />
    </aside>
  );
}
