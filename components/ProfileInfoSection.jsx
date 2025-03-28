import styles from "@/styles/profileInfoSection.module.css";

import UpdateInfoInput from "./UpdateInfoInput";

import { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faAt, faEnvelope, faCakeCandles, faEllipsis, faUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const moment = require("moment");

export default function ProfileInfoSection({ publicId, firstname, bio, location, email, website, birthdate, job, onRefresh }) {
  const [editingField, setEditingField] = useState(null);

  const user = useSelector((state) => state.user.value);

  const formattedBirthDate = moment(birthdate).format("MMMM Do YYYY");
  const age = moment().diff(moment(birthdate), "years");

  // Mettre à jour les informations textes
  const handleUpdateInfo = async (field, value) => {
    try {
      const res = await fetch("https://my-social-app-backend.vercel.app/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        const data = await res.json();
        onRefresh();
        setEditingField(null);
      }
    } catch (err) {
      console.error("Error during updating profile infos:", err);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>About {firstname}</p>
      <div className={styles.line}></div>
      <div className={styles.infoContainer}>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          {editingField === "bio" ? (
            <UpdateInfoInput
              inputName="Biography"
              type="textarea"
              initialValue={bio || ""}
              onSave={(newValue) => handleUpdateInfo("bio", newValue)}
              onClose={() => setEditingField(null)}
            />
          ) : (
            <p className={styles.text}>{bio}</p>
          )}
          {user.publicId === publicId && (
            <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("bio")} />
          )}
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faBriefcase} className={styles.icon} />
          {editingField === "job" ? (
            <UpdateInfoInput
              inputName="Work"
              type="text"
              initialValue={job || ""}
              onSave={(newValue) => handleUpdateInfo("job", newValue)}
              onClose={() => setEditingField(null)}
            />
          ) : (
            <p className={styles.text}>{job}</p>
          )}
          {user.publicId === publicId && (
            <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("job")} />
          )}
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <p className={styles.text}>{email}</p>
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faAt} className={styles.icon} />
          {editingField === "website" ? (
            <UpdateInfoInput
              inputName="Website"
              type="url"
              initialValue={website || "http://"}
              onSave={(newValue) => handleUpdateInfo("website", newValue)}
              onClose={() => setEditingField(null)}
            />
          ) : (
            <a className={`${styles.link} ${styles.text}`} href={website} target="_blank">
              {website}
            </a>
          )}
          {user.publicId === publicId && (
            <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("website")} />
          )}
        </div>
        <div className={styles.infoCard}>
          <FontAwesomeIcon icon={faHouseChimney} className={styles.icon} />
          {editingField === "location" ? (
            <UpdateInfoInput
              inputName="Location"
              type="text"
              initialValue={location || ""}
              onSave={(newValue) => handleUpdateInfo("location", newValue)}
              onClose={() => setEditingField(null)}
            />
          ) : (
            <p className={styles.text}>
              Lives at{" "}
              <a className={styles.link} href={`https://www.google.fr/maps/place/${location}`} target="_blank">
                {location}
              </a>
            </p>
          )}
          {user.publicId === publicId && (
            <FontAwesomeIcon icon={faEllipsis} className={styles.iconUpdate} onClick={() => setEditingField("location")} />
          )}
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
