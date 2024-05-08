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
import styles from "./NewPatientForm.module.css";
import { useRef, useState } from "react";

const NewPatientForm = () => {
  // const [gender, setGender] = useState('female')
  const [age, setAge] = useState('')

  const initialPatient = 
  {
    name: '',
    age:'',
    gender: 'female',
    mobileNo: '',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(patient)
    // adding the new patient to the db
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
            <FormControl required sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="age" className={styles.age}>Age</InputLabel>
              <Select
                labelId="age"
                id="age"
                label="Age *"
                className={styles.age}
                name="age"
                value={patient.age}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value={0} className={styles.age}>1-16</MenuItem>
                <MenuItem value={1} className={styles.age}>17-29</MenuItem>
                <MenuItem value={2} className={styles.age}>30-44</MenuItem>
                <MenuItem value={3} className={styles.age}>45 or above</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
              <div className={styles.frameWrapper}>
                <div className={styles.mobileNoParent}>
                  <FormControl>
                    <FormLabel id="gender">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="gender"
                      name="gender"
                      value={patient.gender}
                      onChange={(e) => handleChange(e)}
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
                      name="mobileNo"
                      value={patient.mobileNo}
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
