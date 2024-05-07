import {useParams} from "react-router-dom";

import { collection, doc, getDoc} from "firebase/firestore";
import { database } from "../config/firebase-config";

export const useGetPatientInfo = () => {
    let patientId = useParams().id;
    let collectionRef = collection(database, "patients");

    let getPatientInfo = async () => {
        try{
            let q = doc(collectionRef, patientId)
            let docSnapShot = await getDoc(q)
            if (docSnapShot.exists()) {
                console.log(docSnapShot.id)
                return { id: docSnapShot.id, ...docSnapShot.data()}
            }
            else {
                console.log("No such document!");
                return null;
            }
        } catch (err){
            console.error("Error getting document:", err);
            return null;
        }
    }

    return {getPatientInfo}
}