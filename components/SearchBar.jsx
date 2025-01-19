import styles from "@/styles/searchBar.module.css";

export default function SearchBar({ placeholder }) {
  const handleSearch = () => {};

  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
