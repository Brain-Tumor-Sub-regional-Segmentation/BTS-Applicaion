import NewPatientForm from "./NewPatientForm";
import styles from "./NewPatient.module.css";

const NewPatient = () => {
  return (
    <div className={styles.newPatient}>
      <div className={styles.newPatientChild} />
      <section className={styles.newPatientInner}>
        <NewPatientForm />
      </section>
    </div>
  );
};

export default NewPatient;
