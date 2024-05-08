import NewPatientForm from "./NewPatientForm";
import styles from "./NewPatient.module.css";
import NavBar from "../../components/NavBar";

const NewPatient = () => {
  return (
    <div className={styles.newPatient}>
      <section className={styles.newPatientInner}>
        <NewPatientForm />
      </section>
    </div>
  );
};

export default NewPatient;
