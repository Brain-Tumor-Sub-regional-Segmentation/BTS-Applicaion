import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import SettingsMenu from "./SettingsMenu";

const NavBar = ({firstLetter}) => {
  const navigate = useNavigate();
  return (
    <section className={styles.patient}>
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.groupWrapper}>
            <img
              className={styles.groupIcon}
              loading="lazy"
              alt=""
              src="/group.svg"
            />
          </div>
          <img
            className={styles.groupIcon1}
            loading="lazy"
            alt=""
            src="/group-1.svg"
          />
          <img
            className={styles.groupIcon2}
            loading="lazy"
            alt=""
            src="/group-2.svg"
          />
          <img className={styles.vectorIcon} alt="" />
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.frameGroup}>
            <div className={styles.homeParent} onClick={() => navigate("/home/patients")}>
              <div className={styles.home}>Home</div>
              <div className={styles.lineWrapper}>
                <div className={styles.frameChild} />
              </div>
            </div>
            <div className={styles.processParent} onClick={() => navigate("/home/newProcess")}>
              <div className={styles.process}>Process</div>
              <div className={styles.lineContainer}>
                <div className={styles.frameItem} />
              </div>
            </div>
            <SettingsMenu firstLetter={firstLetter}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
