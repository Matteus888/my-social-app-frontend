import styles from "@/styles/profileInfoCard.module.css";
import UpdateInfoInput from "./UpdateInfoInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faAt, faEnvelope, faCakeCandles, faEllipsis, faUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const moment = require("moment");

export default function ProfileInfoCard({ firstname, lastname, bio, location, email, website, birthdate, job, onUpdate }) {
  const [editingField, setEditingField] = useState(null);

  const formattedBirthDate = moment(birthdate).format("MMMM Do YYYY");
  const age = moment().diff(moment(birthdate), "years");

  const handleSave = (field, value) => {
    onUpdate(field, value);
    setEditingField(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About {firstname}</h2>
      <div className={styles.line}></div>
      <div className={styles.infoContainer}>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          {editingField === "bio" ? (
            <UpdateInfoInput initialValue={bio || ""} onSave={(newValue) => handleSave("bio", newValue)} />
          ) : (
            <p className={styles.text}>{bio}</p>
          )}
          <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("bio")} />
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faBriefcase} className={styles.icon} />
          {editingField === "job" ? (
            <UpdateInfoInput initialValue={job || ""} onSave={(newValue) => handleSave("job", newValue)} />
          ) : (
            <p className={styles.text}>{job}</p>
          )}
          <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("job")} />
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <p className={styles.text}>{email}</p>
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faAt} className={styles.icon} />
          {editingField === "website" ? (
            <UpdateInfoInput initialValue={website || ""} onSave={(newValue) => handleSave("website", newValue)} />
          ) : (
            <p className={styles.text}>{website}</p>
          )}
          <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("website")} />
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faHouseChimney} className={styles.icon} />
          {editingField === "location" ? (
            <UpdateInfoInput initialValue={location || ""} onSave={(newValue) => handleSave("location", newValue)} />
          ) : (
            <p className={styles.text}>Lives at {location}</p>
          )}
          <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("location")} />
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faCakeCandles} className={styles.icon} />
          <p className={styles.text}>
            {formattedBirthDate} <span className={styles.textLight}>({age} years old)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
