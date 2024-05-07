import './PatientBasicInfo.css'
import {FaCalendar, FaNotesMedical, FaPhone, FaCaretDown, FaCaretUp, FaSyringe} from "react-icons/fa";
import {useState} from "react";

const PatientBasicInfo = ({patient}) => {
    let [showHistory, setShowHistory] = useState(true);
    let [showMedication, setShowMedication] = useState(true);

    let birthTimeStamp = patient.birthday.seconds
    let milliseconds = birthTimeStamp * 1000;
    let age = Math.floor((new Date() - new Date(milliseconds)) / (1000 * 60 * 60 * 24 * 365.25))

    let gender = patient.gender? "Male" : "Female"
    let genderIcon = patient.gender? "♂" : "♀"

    return (<div className={'patient-page-basic-info'}>
        <div className={'patient-page-age-gender-phone'}>
            <div className={'patient-card-medicine-history'}>
                <FaCalendar className={'patient-card-icon'}/>
                <span style={{fontWeight: "bold"}} className={'patient-page-span'}> Age: </span> {age} Years
            </div>
            <div className={'patient-card-medicine-history'}>
                <span className={'patient-card-icon'}> {genderIcon} </span>
                <span style={{fontWeight: "bold"}} className={'patient-page-span'}>  Gender: </span> {gender}
            </div>
            <div className={'patient-card-medicine-history'}>
                <FaPhone className={'patient-card-icon'}/>
                <span style={{fontWeight: "bold"}} className={'patient-page-span'}> Phone: </span> {patient.phone}
            </div>
        </div>

        <div className={'patient-page-history'}>
            <div className={'patient-page-history-title'}>
                <button className={'patient-page-drop-btn'} onClick={() => setShowHistory(!showHistory)}>
                    <FaNotesMedical/> Medical History {showHistory ? <FaCaretUp/> : <FaCaretDown/>}</button>
            </div>
            {showHistory && (
                <div className={'patient-page-history-body'}> {patient.medicalHistory} </div>
            )}
        </div>

        <div className={'patient-page-history'}>
            <div className={'patient-page-history-title'}>
                <button className={'patient-page-drop-btn'} onClick={() => setShowMedication(!showMedication)}>
                    <FaSyringe/> Medications {showMedication ? <FaCaretUp/> : <FaCaretDown/>}</button>
            </div>
            {showMedication && (
                <div className={'patient-page-history-body'}> {patient.medications} </div>
            )}
        </div>

    </div>)
}

export default PatientBasicInfo;