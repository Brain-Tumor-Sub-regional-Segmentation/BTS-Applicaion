import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import {auth} from "../../config/firebase-config"
import {onAuthStateChanged} from "firebase/auth";

import SearchComponent from "../components/SearchComponent"

const PatientList = () => {
    let navigate = useNavigate();
    let [doctorID, setDoctorID] = useState()

    // Authenticating the User: if not authenticated, redirect to home / signup page
    useEffect(() => {
        onAuthStateChanged(auth, (usr) => {
            if(!usr) navigate('/') // unauthenticated user is trying to access patient page
            setDoctorID(usr.uid)
            console.log("Authenticated Successfully!")
        })
    }, [doctorID]);

    return (<>
       <SearchComponent />
       <div className={'patient-list'}>
           Patient List
       </div>
    </>)
}

export default PatientList;