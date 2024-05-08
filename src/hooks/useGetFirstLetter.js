import { useGetDoctorID } from './useGetDoctorID';
import { getDoc, doc } from "fلهirebase/firestore";
import { database } from "../config/firebase-config";

export const useGetFirstLetter = () => {
    const { doctorID } = useGetDoctorID();

    const getFirstLetter = async () => {
    const ref = doc(database, 'doctors', doctorID);
    try {
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            console.log(snapshot.data());
            return snapshot.data().username.charAt(0).toUpperCase();
        }
        else 
            return null;
    } catch (e) {
        console.log("No document found with this id: ", doctorID);
        return null;
    }       
  };
  
  return {getFirstLetter};
}