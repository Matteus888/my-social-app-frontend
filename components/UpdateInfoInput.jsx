import styles from "@/styles/updateInfoInput.module.css";
import { useState } from "react";

export default function UpdateInfoInput({ initialValue = "", onSave }) {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim() !== "") {
      onSave(value);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
