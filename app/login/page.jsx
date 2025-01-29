"use client";

import styles from "../../styles/login.module.css";

import InfoCard from "@/components/InfoCard";
import Footer from "@/components/Footer";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/userReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const errorMessages = {
    404: "User doesn't exist",
    401: "Invalid password",
  };

  // Message d'erreur en fonction du statut de la réponse
  const handleError = (status) => {
    const message = errorMessages[status] || "An unexpected error occurred. Please try again.";
    setError(true);
    setErrorMessage(message);
  };

  // Se connecter à un compte utilisateur
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
        const res = await fetch("http://localhost:3000/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailValue, passwordValue }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.result) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch(
              login({
                firstname: data.user.profile.firstname,
                lastname: data.user.profile.lastname,
                publicId: data.user.publicId,
                avatar: data.user.profile.avatar,
                friends: data.user.social.friends,
                friendRequests: data.user.social.friendRequests,
                following: data.user.social.following,
                followers: data.user.social.followers,
              })
            );
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
        <h1 className={styles.pageTitle}>My Social App</h1>
        <InfoCard content="Just for a look connect with email: matteus888@test.com password: azerty" />
        <div className={styles.loginContainer}>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <p className={styles.loginTitle}>Connect to My Social App</p>
            <div className={styles.infoAlert}>
              <p>You must login to continue.</p>
            </div>
            <input
              className={styles.emailInput}
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className={styles.passwordContainer}>
              <input
                className={styles.passwordInput}
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
            <p className={styles.errorText} role="alert">
              {error ? errorMessage : <span style={{ visibility: "hidden" }}>Invisible</span>}
            </p>
            <button type="submit" className={styles.loginBtn} onClick={handleSubmit}>
              Connect
            </button>
          </form>
          {/* Forget account à mettre en place */}
          <p className={styles.forgetLink}>Forget account details ?</p>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <p className={styles.lineText}>OR</p>
            <div className={styles.line}></div>
          </div>
          <Link href="/register" name="Register" className={styles.registerLink}>
            Create new account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
