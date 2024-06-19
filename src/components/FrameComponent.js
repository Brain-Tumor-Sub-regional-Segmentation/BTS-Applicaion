import styles from "./FrameComponent.module.css";

const FrameComponent = () => {
  return (
    <div className={styles.processDateInner}>
      <div className={styles.dateParent}>
        <div className={styles.date}>
          <div className={styles.dateChild} />
          <div className={styles.patientName}>{`Patient name `}</div>
          <div className={styles.processWrapper}>
            <div className={styles.process}>Process</div>
          </div>
        </div>
        <div className={styles.resultsWrapper}>
          <h2 className={styles.results}>Results</h2>
        </div>
        <div className={styles.date1}>
          <div className={styles.dateItem} />
          <div className={styles.div}>06/02/2024</div>
          <div className={styles.amWrapper}>
            <div className={styles.am}>7:30 AM</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
