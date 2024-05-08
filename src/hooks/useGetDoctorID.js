import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

export const useGetDoctorID = () => {
    let [doctorID, setDoctorId] = useState(null);

    useEffect(() => {
        console.log("useGetDoctorID called");
        onAuthStateChanged(auth, (usr) => {
            if (usr) setDoctorId(usr.uid)
        })
    }, [doctorID]);

    return { doctorID }; // Change doctorId to doctorID
};