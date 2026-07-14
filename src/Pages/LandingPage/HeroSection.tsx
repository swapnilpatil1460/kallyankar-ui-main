import styles from "./Header.module.css";
import { Link } from "react-router-dom";

import { KalyankarLogo } from "../../components/svg";
import { LogInIcon } from "lucide-react";
const HeroSection = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles["header__logo-box"]}>
          <img
            src={KalyankarLogo}
            alt="Logo"
            className={`${styles["header__logo"]}`}
          />
        </div>

        <div className="relative w-full">
          <Link to="/admin-login" className="w-full">
            <div className={`${styles.btn} ${styles["btn--animated"]}`}>
              <LogInIcon />
            </div>
          </Link>
        </div>
        <div className={styles["header__text-box"]}>
          <h1 className={styles["heading-primary"]}>
            <span className={styles["heading-primary--main"]}>Kalyankar's</span>
            <span className={styles["heading-primary--sub"]}>
              Empower Your Drive with High-Quality Batteries
            </span>
          </h1>
        </div>
      </header>
    </div>
  );
};

export default HeroSection;
