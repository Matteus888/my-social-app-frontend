import styles from "@/styles/updateImageModal.module.css";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function UpdateImageModal({ inputName, onImageUpload, onClose, width, radius }) {
  const [fileName, setFileName] = useState("No file selected");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedImage(file);
    } else {
      setFileName("No file selected");
      setPreviewUrl(null);
      setSelectedImage(null);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.title}>{inputName}</p>
        <div className={styles.preview} style={{ width: `${width}`, borderRadius: `${radius}` }}>
          {previewUrl && <img src={previewUrl} alt="Preview" className={styles.previewImage} />}
        </div>
        <div className={styles.fileSelector}>
          <input className={styles.input} type="file" accept="image/*" id="file-input" onChange={handleFileChange} />
          <label htmlFor="file-input" className={`${styles.btn} ${styles.btnFile}`}>
            <FontAwesomeIcon icon={faUpload} color="white" /> Upload file
          </label>
          <span className={styles.fileName}>{fileName}</span>
        </div>
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.btnUpdate}`} onClick={() => onImageUpload(selectedImage)}>
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
