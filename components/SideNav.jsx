import styles from "../styles/sidenav.module.css";

export default function SideNav() {
  return (
    <nav className={styles.sidenav}>
      <h2>SideNav</h2>
      <ul className={styles.sidenavList}>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
        <li>Link 4</li>
        <li>Link 5</li>
      </ul>
    </nav>
  );
}
