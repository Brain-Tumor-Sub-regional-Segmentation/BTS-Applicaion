import {collection, orderBy, query, where, limitToLast, limit, getDocs, startAfter, endBefore} from "firebase/firestore";
import {database} from "../config/firebase-config";
import {useParams} from "react-router-dom";

export const useGetProcessesPerPage = () => {
    let patientId = useParams().id;
    const collectionRef = collection(database, "processes");

    let getLatestProcesses = async (firstDoc, lastDoc, isLatest) => {
        let q;
        if(isLatest)
            q = query(collectionRef, where("patientID", '==', patientId),
                orderBy("date"),
                limitToLast(3));
        else if(firstDoc)
            q = query(collectionRef, where("patientID", '==', patientId),
                orderBy('date'),
                endBefore(firstDoc),
                limitToLast(3));
        else if(lastDoc)
            q = query(collectionRef, where("patientID", '==', patientId),
                orderBy('date'),
                startAfter(lastDoc),
                limit(3))
        else if(!isLatest)
            q = query(collectionRef, where("patientID", '==', patientId),
                orderBy("date"),
                limit(3));

        let snapshot = await getDocs(q);
        let docs = [];
        let lastVisibleDoc, firstVisibleDoc
        snapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id});
        })
        if(docs.length > 0){
            lastVisibleDoc = snapshot.docs[docs.length - 1]
            firstVisibleDoc = snapshot.docs[0]
        }
        return {docs, firstVisibleDoc, lastVisibleDoc}
    }

    return {getLatestProcesses}
}