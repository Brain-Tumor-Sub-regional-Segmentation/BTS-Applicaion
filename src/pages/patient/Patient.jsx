import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'

import {auth} from "../../config/firebase-config"
import {onAuthStateChanged} from "firebase/auth";

import {useGetPatientInfo} from '../../hooks/useGetPatientInfo'
import {useGetProcessesPerPage} from '../../hooks/useGetProcessesPerPage'

import './Patient.css'
import PatientBasicInfo from "./PatientBasicInfo";
import PageSlider from "../components/page-slider-component/PageSlider";
import ProcessCard from "./ProcessCard";
import PatientCard from "../patient-list/PatientCard";

const Patient = () => {
    let navigate = useNavigate();
    let {getPatientInfo} = useGetPatientInfo()
    let {getLatestProcesses} = useGetProcessesPerPage()

    let [patient, setPatient] = useState(null)
    let [processes, setProcesses] = useState([])
    let [firstVisibleDoc, setFirstDoc] = useState(null)
    let [lastVisibleDoc, setLastDoc] = useState(null)
    let [loading, setLoading] = useState(true)
    let [notes, setNotes] = useState('')

    // Authenticating the User: if not authenticated, redirect to home / signup page
    useEffect(() => {
        onAuthStateChanged(auth, (usr) => {
            if(!usr) navigate('/') // unauthenticated user is trying to access patient page
            console.log("Authenticated Successfully!")
        })
    }, []);

    // Loading patients of recently updated status on loading the page
    useEffect(() => {
        getPatientInfo().then(p => {
            if(p === null) navigate('/not-found')
            setPatient({...p})
            if(loading) getMostRecentProcesses();
        })
    }, [loading])

    // Displaying Alerts for a while: there may be updates
    useEffect(() => {
        let timer;
        timer = setTimeout(() => {setNotes('')} , 9000);
        return () => clearTimeout(timer);
    }, [notes]);

    let getMostRecentProcesses = () => {
        getLatestProcesses(null, null, true).then(result => {
            result.docs.reverse()
            setProcesses(result.docs)
            setFirstDoc(result.firstVisibleDoc)
            setLastDoc(result.lastVisibleDoc)
            setLoading(false)
            setNotes('')
        })
    }

    let getMoreRecentProcesses = () => {
        getLatestProcesses(null, lastVisibleDoc, false).then(result => {
            let docs = result.docs;
            if(docs.length > 0){
                docs.reverse()
                setProcesses(docs)
                setFirstDoc(result.firstVisibleDoc)
                setLastDoc(result.lastVisibleDoc)
                setNotes('')
            }
            else setNotes('These are The Most Recently Updated Records')
        })
    }

    let getLessRecentProcesses = () => {
        getLatestProcesses(firstVisibleDoc, null, false).then(result => {
            let docs = result.docs
            if(docs.length > 0){
                docs.reverse()
                setProcesses(docs)
                setFirstDoc(result.firstVisibleDoc)
                setLastDoc(result.lastVisibleDoc)
                setNotes('')
            }
            else setNotes('These are The Least Recently Updated Records')
        })
    }

    let getLeastRecentProcesses = () => {
        getLatestProcesses(null, null, false).then(result => {
            result.docs.reverse()
            setProcesses(result.docs)
            setFirstDoc(result.firstVisibleDoc)
            setLastDoc(result.lastVisibleDoc)
            setNotes('')
        })
    }

    return (
        <div className={'patient-page'}>
        {!loading && <div className={'patient-page-main'}>
            <div className={'patient-page-name'}> {patient.name} </div>
            <PageSlider leastRecentAction={getLeastRecentProcesses}
                        lessRecentAction={getLessRecentProcesses}
                        moreRecentAction={getMoreRecentProcesses}
                        mostRecentAction={getMostRecentProcesses}
                        domain={'patient'} notes={notes}/>
            {processes.map(p => <ProcessCard key={p.id} process={p}/>)}
        </div>}
            {!loading && <PatientBasicInfo patient={patient} />}

    </div>)
}

export default Patient;

//     yHvszdNfG9KkyOlug6BS   Jane Smith
//     uMyaK2dVgki32eWVpVKp   John Doe
