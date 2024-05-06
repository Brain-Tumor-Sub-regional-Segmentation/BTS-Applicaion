import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import {auth} from "../../config/firebase-config"
import {onAuthStateChanged} from "firebase/auth";

import PageSlider from "../components/page-slider-component/PageSlider"
import SearchComponent from "../components/search-component/SearchComponent"
import { useGetPatientsPerPage } from '../../hooks/useGetPatientsPerPage'

import './PatientList.css'
import PatientCard from "./PatientCard";

const PatientList = () => {
    let navigate = useNavigate();
    let {getLatestPatients} = useGetPatientsPerPage()

    let [loading, setLoading] = useState(true)
    let [notes, setNotes] = useState('')
    let [patientList, setPatients] = useState([])
    let [firstVisiblePatient, setFirstVisiblePatient] = useState(null)
    let [lastVisiblePatient, setLastVisiblePatient] = useState(null)

    // Authenticating the User: if not authenticated, redirect to home / signup page
    useEffect(() => {
        onAuthStateChanged(auth, (usr) => {
            if(!usr) navigate('/') // unauthenticated user is trying to access patient page
            console.log("Authenticated Successfully!")
        })
    }, []);

    // Loading patients of recently updated status on loading the page
    useEffect(() => {getMostRecentPatients();}, [loading]);

    // Displaying Alerts for a while: there may be updates
    useEffect(() => {
        let timer;
        timer = setTimeout(() => {setNotes('')} , 9000);
        return () => clearTimeout(timer);
    }, [notes]);

    let getMostRecentPatients = () => {
        getLatestPatients(null, null, true).then(result => {
            setPatients(result.docs)
            setFirstVisiblePatient(result.firstVisibleDoc)
            setLastVisiblePatient(result.lastVisibleDoc)
            setLoading(false)
            setNotes('')
        })
    }

    let getMoreRecentPatients = () => {
        getLatestPatients(null, lastVisiblePatient, false).then(result => {
            let docs = result.docs;
            if(docs.length > 0){
                setPatients(docs)
                setFirstVisiblePatient(result.firstVisibleDoc)
                setLastVisiblePatient(result.lastVisibleDoc)
                setNotes('')
            }
            else setNotes('These are The Most Recently Updated Records')
        })
    }

    let getLessRecentPatients = () => {
        getLatestPatients(firstVisiblePatient, null, false).then(result => {
            let docs = result.docs
            if(docs.length > 0){
                setPatients(docs)
                setFirstVisiblePatient(result.firstVisibleDoc)
                setLastVisiblePatient(result.lastVisibleDoc)
                setNotes('')
            }
            else setNotes('These are The Least Recently Updated Records')
        })
    }

    let getLeastRecentPatients = () => {
        getLatestPatients(null, null, false).then(result => {
            setPatients(result.docs)
            setFirstVisiblePatient(result.firstVisibleDoc)
            setLastVisiblePatient(result.lastVisibleDoc)
            setNotes('')
        })
    }

    return (<>
        <SearchComponent/>
        <div className={'patient-list-container'}>
            <PageSlider leastRecentAction={getLeastRecentPatients}
                        lessRecentAction={getLessRecentPatients}
                        moreRecentAction={getMoreRecentPatients}
                        mostRecentAction={getMostRecentPatients}
                        domain={'patients'} notes={notes}/>

            <div className={'patients-list'}>
                {patientList.map((p) => <PatientCard key={p.id} patient={p}/>)}
            </div>
        </div>
    </>)
}

export default PatientList;