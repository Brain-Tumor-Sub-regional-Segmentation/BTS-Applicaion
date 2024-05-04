import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

export const useGetDoctorID = () => {
    let [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        console.log("useGetDoctorID called");
        onAuthStateChanged(auth, (usr) => {
            if (usr) {
                console.log(usr.uid);
                setDoctorId(usr.uid);
            }
        })
    }, [doctorId]);

    return { doctorId }; // Change doctorId to doctorID
};