import styles from "./FrameComponent.module.css";

const FrameComponent = ({date, processName, patientName}) => {
  // console.log( processName, patientName)
  const convertFirestoreTimestamp = (timestamp) => {
    // Extract seconds and nanoseconds from Firestore timestamp
    const { seconds, nanoseconds } = timestamp;
    // console.log(timestamp)
    // Create a JavaScript Date object
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);

    // Format the date to dd/mm/yyyy format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, hence +1
    const year = date.getFullYear();
    // console.log(day, month, year)
    return `${day}/${month}/${year}`;
};
const convertFirestoreTimestampHours = (timestamp) => {
  // Extract seconds and nanoseconds from Firestore timestamp
  const { seconds, nanoseconds } = timestamp;

  // Create a JavaScript Date object
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  // Format the time to HH:MM AM/PM format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedTime;
};
const formattedDate = convertFirestoreTimestamp(date);
const formattedTime = convertFirestoreTimestampHours(date);
// console.log(formattedDate, formattedTime)
return (
  <div className={styles.processDateInner}>
    <div className={styles.dateParent}>
      <div className={styles.date}>
        <div className={styles.dateChild} />
        <div className={styles.patientName}>{patientName}</div>
        <div className={styles.processWrapper}>
          <div className={styles.process}>{processName}</div>
        </div>
      </div>
      <div className={styles.resultsWrapper}>
        <h2 className={styles.results}>Results</h2>
      </div>
      <div className={styles.date1}>
        <div className={styles.dateItem} />
        <div className={styles.div}>{formattedDate}</div>
        <div className={styles.amWrapper}>
          <div className={styles.am}>{formattedTime}</div>
        </div>
      </div>
    </div>
  </div>
);
};

export default FrameComponent;
