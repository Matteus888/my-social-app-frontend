"use client";

import styles from "../../styles/register.module.css";
import defaultProfilePic from "@/data/defaultProfilePic";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/store/userReducer";

export default function Register() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPassWordValue] = useState("");
  const [day, setDay] = useState(currentDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogDate, setIsDialogDate] = useState(false);
  const [isDialogGender, setIsDialogGender] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);

  const days = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 123 }, (_, i) => currentYear - i);

  const calculateAge = () => {
    const age = currentYear - year;
    const monthDiff = currentMonth - month;
    const dayDiff = currentDay - day;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1;
    }
    return age;
  };

  const birthdateValue = new Date(year, month - 1, day);

  const handleSubmit = async () => {
    // Validation des champs remplis
    const validate = () => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (firstnameValue.trim() === "") {
        firstnameRef.current.focus();
        return "Please enter your firstname";
      }
      if (lastnameValue.trim() === "") {
        lastnameRef.current.focus();
        return "Please enter your lastname";
      }
      if (calculateAge() < 15) {
        return "You must be at least 15 years old to register.";
      }
      if (emailValue.trim() === "") {
        emailRef.current.focus();
        return "Please enter your email";
      }
      if (!regex.test(emailValue)) {
        emailRef.current.focus();
        return "Invalid email address";
      }
      if (passwordValue.trim() === "") {
        passwordRef.current.focus();
        return "Please enter a password";
      }
      return null;
    };

    const validationMessage = validate();
    if (validationMessage) {
      setError(true);
      setErrorMessage(validationMessage);
      return;
    }

    setError(false);
    setErrorMessage("");

    // Choix d'une photo de profile selon genre
    const getRandomPhotoPath = (gender) => {
      const genderPics = defaultProfilePic[gender];

      const randomIndex = Math.floor(Math.random() * genderPics.length);
      const randomPhotoId = genderPics[randomIndex];

      return `https://res.cloudinary.com/dzqy8gnmh/image/upload/v1736507142/${randomPhotoId}.png`;
    };

    const avatarPath = getRandomPhotoPath(genderValue);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailValue, passwordValue, firstnameValue, lastnameValue, birthdateValue, genderValue, avatarPath }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch(
            login({
              firstname: data.user.profile.firstname,
              lastname: data.user.profile.lastname,
              publicId: data.user.publicId,
              avatar: data.user.profile.avatar,
            })
          );
          router.push("/");
        }
      } else {
        setError(true);
        setErrorMessage("This user already exists.");
      }
    } catch (err) {
      console.error("Error during register:", error);
      setError(true);
      setErrorMessage("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>My Social App</h1>
        <div className={styles.registerContainer}>
          <h2 className={styles.registerTitle}>Create a new account</h2>
          <p className={styles.slogan}>It's quick and esay.</p>
          <div className={styles.line}></div>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <div className={styles.formContainer}>
              <div className={styles.nameContainer}>
                <input
                  className={styles.nameInput}
                  ref={firstnameRef}
                  type="text"
                  placeholder="Firstname"
                  value={firstnameValue}
                  onChange={(e) => setFirstnameValue(e.target.value)}
                />
                <input
                  className={styles.nameInput}
                  ref={lastnameRef}
                  type="text"
                  placeholder="Lastname"
                  value={lastnameValue}
                  onChange={(e) => setLastnameValue(e.target.value)}
                />
              </div>
              <div className={styles.birthdateContainer}>
                <div className={styles.labelContainer}>
                  <p className={styles.label}>Date of Birth</p>
                  <a
                    href="#"
                    id="birthdate__help"
                    title="Click here for more informations"
                    role="button"
                    onClick={() => setIsDialogDate(!isDialogDate)}
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                  </a>
                  {isDialogDate && (
                    <dialog open className={styles.dialog} onClick={() => setIsDialogDate(!isDialogDate)}>
                      <p>
                        Entering your date of birth ensures that your <b>My Social App</b> experience is age-appropriate.
                      </p>
                    </dialog>
                  )}
                </div>
                <div className={styles.selectContainer}>
                  <select className={styles.select} aria-label="Day" value={day} onChange={(e) => setDay(e.target.value)}>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select className={styles.select} aria-label="Month" value={month} onChange={(e) => setMonth(e.target.value)}>
                    {months.map((m, index) => (
                      <option key={index + 1} value={index + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select className={styles.select} aria-label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.genderContainer}>
                <div className={styles.labelContainer}>
                  <p className={styles.label}>Gender</p>
                  <a
                    href="#"
                    id="birthdate__help"
                    title="Click here for more informations"
                    role="button"
                    onClick={() => setIsDialogGender(!isDialogGender)}
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                  </a>
                  {isDialogGender && (
                    <dialog open className={styles.dialog} onClick={() => setIsDialogGender(!isDialogGender)}>
                      <p>Select Custom to choose another gender, or if you prefer, irrelevant.</p>
                    </dialog>
                  )}
                </div>
                <div className={styles.checkboxContainer}>
                  <label className={styles.checkboxLabel}>
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={genderValue === "female"}
                      onChange={(e) => setGenderValue(e.target.value)}
                    />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={genderValue === "male"}
                      onChange={(e) => setGenderValue(e.target.value)}
                    />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      value="custom"
                      checked={genderValue === "custom"}
                      onChange={(e) => setGenderValue(e.target.value)}
                    />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Irrelevant
                    <input
                      type="radio"
                      name="gender"
                      value="irrelevant"
                      checked={genderValue === "irrelevant"}
                      onChange={(e) => setGenderValue(e.target.value)}
                    />
                  </label>
                </div>
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
                  placeholder="Enter new password"
                  value={passwordValue}
                  onChange={(e) => setPassWordValue(e.target.value)}
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
              <p className={styles.policyText}>
                By clicking on Register, you agree to our Terms and Conditions. Find out how we collect, use and share your data by reading
                our Privacy Policy and how we use cookies and similar technologies by consulting our Cookie Usage Policy. You may receive
                text notifications from us, and you can unsubscribe at any time.
              </p>
              <button type="submit" className={styles.registerBtn} onClick={handleSubmit}>
                Register
              </button>
              <Link href="/login" name="Login" className={styles.loginLink}>
                You already have an account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
