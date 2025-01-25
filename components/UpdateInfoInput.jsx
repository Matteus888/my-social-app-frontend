import styles from "@/styles/updateInfoInput.module.css";
import { useState } from "react";

export default function UpdateInfoInput({ initialValue = "", type, inputName, onSave, onClose }) {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim() !== "") {
      onSave(value);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.title}>{inputName}</p>
        <input className={styles.input} type={type} value={value} onChange={(e) => setValue(e.target.value)} />
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.btnUpdate}`} onClick={handleSave}>
            Update
          </button>
          <button className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
