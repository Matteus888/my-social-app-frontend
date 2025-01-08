"use client";

import styles from "../../styles/register.module.css";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Register() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [day, setDay] = useState(currentDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const days = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentYearValue = currentYear;
  const years = Array.from({ length: 123 }, (_, i) => currentYearValue - i);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>My Social App</h1>
        <div className={styles.registerContainer}>
          <h2 className={styles.registerTitle}>Create a new account</h2>
          <p className={styles.slogan}>It's quick and esay.</p>
          <div className={styles.line}></div>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <div className={styles.formContainer}>
              <div className={styles.nameContainer}>
                <input className={styles.input} type="text" placeholder="Firstname" />
                <input className={styles.input} type="text" placeholder="Lastname" />
              </div>
              <div className={styles.birthDateContainer}>
                <div className={styles.birthLabelContainer}>
                  <p className={styles.birthLabel}>Date of Birth</p>
                  <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                </div>
                <div className={styles.selectsContainer}>
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
                <div className={styles.genderLabelContainer}>
                  <p className={styles.genderLabel}>Gender</p>
                  <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                </div>
                <div className={styles.checkboxesContainer}>
                  <label className={styles.checkboxLabel}>
                    Female
                    <input type="radio" />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Male
                    <input type="radio" />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Custom
                    <input type="radio" />
                  </label>
                  <label className={styles.checkboxLabel}>
                    Irrelevant
                    <input type="radio" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
