"use client";

import styles from "../../styles/login.module.css";
import InfoCard from "@/components/InfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async () => {
    let response = await fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailValue, passwordValue }),
    });

    if (response.ok) {
      let data = await response.json();
      console.log("connexion réussi", data);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>My Social App</h1>
        <InfoCard content="You must login to continue." />
        <div className={styles.loginContainer}>
          <p className={styles.loginTitle}>Connect to My Social App</p>
          <div className={styles.infoAlert}>
            <p>You must login to continue.</p>
          </div>
          <input className={styles.input} type="text" placeholder="Enter your email" value={emailValue} onChange={handleEmailChange} />
          <div className={styles.inputPwdContainer}>
            <input
              className={styles.inputPwd}
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            {passwordValue && (
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              />
            )}
          </div>
          <button type="submit" className={styles.btnConnect} onClick={handleSubmit}>
            Connect
          </button>
          <p className={styles.forgottenLink}>Forgotten account details ?</p> {/* Gestion à mettre en place */}
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <p className={styles.lineText}>OR</p>
            <div className={styles.line}></div>
          </div>
          <Link href="/register" name="Register" className={styles.btnNewAccount}>
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
}
