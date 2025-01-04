import styles from "../styles/home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <main className={styles.page}>
      <Header />
      <SideNav />
      <div className={styles.main}>
        <h1>Welcome to My Social App</h1>
      </div>
      <Contacts />
      <Footer />
    </main>
  );
}
