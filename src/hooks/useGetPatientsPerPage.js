import {useGetDoctorID} from "./useGetDoctorID";
import {collection, orderBy, query, where, limitToLast, limit, getDocs, startAfter, endBefore} from "firebase/firestore";
import {database} from "../config/firebase-config";

export const useGetPatientsPerPage = () => {
    let { doctorID } = useGetDoctorID()
    const collectionRef = collection(database, "patients");

    let getLatestPatients = async (firstDoc, lastDoc, isLatest) => {
        let q;
        if(isLatest)
            q = query(collectionRef, where("doctorID", '==', doctorID),
                                     orderBy("lastModified"),
                                     limitToLast(4));
        else if(firstDoc)
            q = query(collectionRef, where("doctorID", '==', doctorID),
                                     orderBy('lastModified'),
                                     endBefore(firstDoc),
                                     limitToLast(4));
        else if(lastDoc)
            q = query(collectionRef, where("doctorID", '==', doctorID),
                                     orderBy('lastModified'),
                                     startAfter(lastDoc),
                                     limit(4))

        else if(!isLatest)
            q = query(collectionRef, where("doctorID", '==', doctorID),
                                     orderBy("lastModified"),
                                     limit(4));

        let snapshot = await getDocs(q);
        let docs = [];
        let lastVisibleDoc, firstVisibleDoc
        snapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id});
        })
        if(docs.length > 0){
            docs.reverse()
            lastVisibleDoc = snapshot.docs[docs.length - 1]
            firstVisibleDoc = snapshot.docs[0]
        }
        return {docs, firstVisibleDoc, lastVisibleDoc}
    }

    return {getLatestPatients}
}