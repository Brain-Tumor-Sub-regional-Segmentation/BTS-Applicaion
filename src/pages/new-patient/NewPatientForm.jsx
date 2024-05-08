import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from "./NewPatientForm.module.css";
import dayjs from 'dayjs';
import { useState } from "react";
import { usePostPatient } from "../../hooks/usePostPatient";

const NewPatientForm = () => {
  const [birthday, setBirthday] = useState(dayjs());
  const [gender, setGender] = useState('female');
  const {addNewPatient} = usePostPatient();

  const initialPatient = 
  {
    name: '',
    phone: '',
    medications: '',
    allergies: '',
    medicalHistory: ''
  }
  const [patient, setPatient] = useState(initialPatient)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)
    setPatient({...patient, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log({...patient, gender, birthday, doctorID, lastModified: dayjs()})
    const boolGender = (gender === 'female' ? false : true)
    addNewPatient({...patient, birthday: birthday.toDate(), gender: boolGender});
  }

  return (
    <form>
      <div className={styles.frameParent}>
        <div className={styles.patientNameWrapper}>
          <div className={styles.patientName}>
            <div className={styles.enterPatientname}>
              <b className={styles.patientName1}>Patient Name</b>
            </div>
            <div className={styles.rectangleParent1}>
              <div className={styles.frameChild1} />
              <input
                className={styles.enterPatientName}
                placeholder="Enter Patient name.."
                type="text"
                name="name"
                value={patient.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className={styles.options}>
          <div className={styles.opMenuitemlabel}>
            <div className={styles.dropdownMenuParent}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DemoItem label="Date of birth">
                    <DatePicker maxDate={dayjs()} value={birthday} onChange={setBirthday}/>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <div className={styles.frameWrapper}>
                <div className={styles.mobileNoParent}>
                  <FormControl>
                    <FormLabel id="gender">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.mobileNoParent}>
                  <div className={styles.mobileNo}>Mobile No. :</div>
                  <div className={styles.rectangleParent}>
                    <div className={styles.frameChild} />
                    <input
                      className={styles.input}
                      placeholder="+20 1097445453"
                      type="text"
                      name="phone"
                      value={patient.phone}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.medicationsAllergiesPMH}>
            <div className={styles.allergiesParent}>
              <div>Medications :</div>
              <div className={styles.vectorGroup}>
                <img className={styles.frameInner} alt="" src="/rectangle-91.svg" />
                <input
                  className={styles.input2}
                  placeholder="Medicines...."
                  type="text"
                  name="medications"
                  value={patient.medications}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className={styles.allergiesParent}>
              <div>
                Allergies:
              </div>
              <div className={styles.vectorGroup}>
                <img className={styles.frameInner} alt="" src="/rectangle-91.svg" />
                <input
                  className={styles.input2}
                  placeholder="Food, drugs, etc...."
                  type="text"
                  name="allergies"
                  value={patient.allergies}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className={styles.allergiesParent}>
              <div>
                Personal Medical History:
              </div>
              <div className={styles.vectorGroup}>
                <img className={styles.frameInner} alt="" src="/rectangle-91.svg" />
                <input
                  className={styles.input2}
                  placeholder="Diabetes,High Cholesterol...."
                  type="text"
                  name="medicalHistory"
                  value={patient.medicalHistory}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
              <Button className={styles.addNewPatient} variant="contained" type="submit" onClick={handleSubmit}>Add</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewPatientForm;
