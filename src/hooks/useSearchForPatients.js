import {useCallback, useEffect, useState} from "react";
import { collection, query, where, onSnapshot, or, and} from "firebase/firestore";
import { database } from "../config/firebase-config";
import { useGetDoctorID } from "./useGetDoctorID";

export const useSearchForPatients = (keyword) => {
    const [patients, setPatients] = useState([]);
    let [loading, setLoading] = useState(true);
    const { doctorID } = useGetDoctorID();
    const collectionRef = collection(database, '/patient-trigrams')

    const generateTrigrams = (key) => {
        let map = {}
        for (let k = 0; k <= key.length - 3; k++)
            map[key.substring(k, k + 3)] = true;
        return map;
    }

    let getUsers = async () => {
        let trigrams = generateTrigrams(keyword.toLowerCase());
        let trigramKeys = Object.keys(trigrams);
        let constraints = [];
        trigramKeys.forEach((k) => {
            constraints.push(where(`${k}`, '==', true));
        });

        let unsubscribe;
        try {
            const queryUsers = query(collectionRef,
                and(or(...constraints), where('doctorID', '==', doctorID)));

            unsubscribe = onSnapshot(queryUsers, (snapshot) => {
                const docs = [];
                snapshot.forEach((doc) => {
                    const name = doc.data().name;
                    const id = doc.id;
                    docs.push({ name, id });
                });
                setPatients(docs)
                setLoading(false);
            });

        } catch (e) {
            console.log(e);
            setLoading(true)
            setPatients([]);
        }
        return () => unsubscribe;
    }

    useEffect(() => {
        getUsers()
        .then(() => {console.log("fetched successfully");})
        .catch((e) => {console.log(e);});
    }, [keyword, doctorID, loading]);


    return { patients, loading};
};