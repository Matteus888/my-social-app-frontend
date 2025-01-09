"use client";

import styles from "../../styles/login.module.css";
import InfoCard from "@/components/InfoCard";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const errorMessages = {
    404: "User doesn't exist",
    401: "Invalid password",
  };

  const handleError = (status) => {
    const message = errorMessages[status] || "An unexpected error occurred. Please try again.";
    setError(true);
    setErrorMessage(message);
  };

  const handleSubmit = async () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailValue.trim() === "") {
      setError(true);
      setErrorMessage("Please enter your email");
      emailRef.current.focus();
      return;
    } else if (!regex.test(emailValue)) {
      setError(true);
      setErrorMessage("Invalid email address");
      emailRef.current.focus();
      return;
    } else if (passwordValue.trim() === "") {
      setError(true);
      setErrorMessage("Please enter your password");
      passwordRef.current.focus();
      return;
    } else {
      setError(false);
      setErrorMessage("");

      try {
        const response = await fetch("http://localhost:3000/users/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailValue, passwordValue }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.result) {
            console.log("Signin successful", data);
            router.push("/");
          }
        } else {
          handleError(response.status);
        }
      } catch (err) {
        console.error("Error during login:", error);
        setError(true);
        setErrorMessage("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.page__title}>My Social App</h1>
        <InfoCard content="You must login to continue." />
        <div className={styles.login__container}>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <p className={styles.login__title}>Connect to My Social App</p>
            <div className={styles.info__alert}>
              <p>You must login to continue.</p>
            </div>
            <input
              className={styles.email__input}
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className={styles.input__container}>
              <input
                className={styles.password__input}
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              {passwordValue.trim() && (
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                />
              )}
            </div>
            <p className={styles.error__text} role="alert">
              {error ? errorMessage : <span style={{ visibility: "hidden" }}>Invisible</span>}
            </p>
            <button type="submit" className={styles.btn__login} onClick={handleSubmit}>
              Connect
            </button>
          </form>
          {/* Forget account à mettre en place */}
          <p className={styles.forget__link}>Forget account details ?</p>
          <div className={styles.line__container}>
            <div className={styles.line}></div>
            <p className={styles.line__text}>OR</p>
            <div className={styles.line}></div>
          </div>
          <Link href="/register" name="Register" className={styles.btn__register}>
            Create new account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
