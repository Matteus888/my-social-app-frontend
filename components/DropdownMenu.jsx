import styles from "../styles/dropdownMenu.module.css";

export default function DropdownMenu() {
  return (
    <div className={styles.dropdownMenu}>
      <ul>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}
