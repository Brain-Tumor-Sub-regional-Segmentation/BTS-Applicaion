import { collection, doc, setDoc, addDoc} from "firebase/firestore";
import { database } from "../config/firebase-config";
import { useGetDoctorID } from "./useGetDoctorID";
import dayjs from 'dayjs';

export const usePostPatient = () => {
    const { doctorID } = useGetDoctorID();
    const patientsCollection = collection(database, 'patients');
    
    const generateTrigrams = (patient) => {
        console.log(patient)
        const key = [patient.name || '', patient.phone || '',  
                patient.medications || '', patient.allergies || '', 
                patient.medicalHistory || ''].join(' ').substring(0, 500).toLowerCase();
        let map = {}
        for (let k = 0; k <= key.length - 3; k++)
            map[key.substring(k, k + 3)] = true;
        return map;
    }

    const addNewPatient = async (patient) => {
        await addDoc(patientsCollection, 
            {...patient, doctorID, lastModified: dayjs().toDate()})
        .then(async (docRef) => {
            console.log("New Patient added with ID: ", docRef.id);
            const triDocRef = doc(database, '/patient-trigrams', docRef.id);
            await setDoc(triDocRef, {...generateTrigrams(patient), name:patient.name, doctorID})
            .then(() => console.log("Trigrams are added successfully"))
            .catch((e) => console.log("Error adding trigrams:", e));
        }).catch((e) => {
            console.error("Error adding document: ", e);
        });
    }

    return {addNewPatient};
}