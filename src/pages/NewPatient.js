import NavBar from "../components/NavBar";
import NewPatientForm from "../components/NewPatientForm";
import SettingsMenu from "../components/SettingsMenu";
import styles from "./NewPatient.module.css";

const NewPatient = () => {
  return (
    <div className={styles.newPatient}>
      <NavBar firstLetter="B"/>
      <div className={styles.newPatientChild} />
      <section className={styles.newPatientInner}>
        <NewPatientForm />
      </section>
    </div>
  );
};

export default NewPatient;
