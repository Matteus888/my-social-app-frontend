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
        <h1 className={styles.page__title}>My Social App</h1>
        <div className={styles.register__container}>
          <h2 className={styles.register__title}>Create a new account</h2>
          <p className={styles.slogan}>It's quick and esay.</p>
          <div className={styles.line}></div>
          <form action="submit" onSubmit={async (e) => e.preventDefault()}>
            <div className={styles.form__container}>
              <div className={styles.name__container}>
                <input className={styles.name__input} type="text" placeholder="Firstname" />
                <input className={styles.name__input} type="text" placeholder="Lastname" />
              </div>
              <div className={styles.birthdate__container}>
                <div className={styles.label__container}>
                  <p className={styles.label}>Date of Birth</p>
                  <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                </div>
                <div className={styles.select__container}>
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
              <div className={styles.gender__container}>
                <div className={styles.label__container}>
                  <p className={styles.label}>Gender</p>
                  <FontAwesomeIcon icon={faCircleQuestion} width={12} height={12} style={{ color: "#606770" }} />
                </div>
                <div className={styles.checkbox__container}>
                  <label className={styles.checkbox__label}>
                    Female
                    <input type="radio" />
                  </label>
                  <label className={styles.checkbox__label}>
                    Male
                    <input type="radio" />
                  </label>
                  <label className={styles.checkbox__label}>
                    Custom
                    <input type="radio" />
                  </label>
                  <label className={styles.checkbox__label}>
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
