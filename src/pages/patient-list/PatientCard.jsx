import './PatientCard.css'
import {useNavigate} from "react-router-dom";

import {FaPhone, FaNotesMedical, FaSyringe, FaCalendar, FaClock} from 'react-icons/fa'

const PatientCard = ({patient}) => {
    let navigate = useNavigate();

    let birthTimeStamp = patient.birthday.seconds
    let milliseconds = birthTimeStamp * 1000;
    let age = Math.floor((new Date() - new Date(milliseconds)) / (1000 * 60 * 60 * 24 * 365.25))
    let sex = patient.gender? "Male" : "Female"
    let icon = patient.gender? "♂" : "♀"

    let name = patient.name.length > 25? patient.name.slice(0, 25) + ' ...' : patient.name
    let history = patient.medicalHistory.length <= 50? patient.medicalHistory : (patient.medicalHistory.slice(0, 50) + " ...")
    let medications = patient.medications.length <= 50? patient.medications : (patient.medications.slice(0, 50) + " ...")

    let lastModified = patient.lastModified.seconds
    let date = new Date(lastModified * 1000)
    const dateUTC = date.toISOString().split('T')[0]; // Date alone
    const timeUTC = date.toISOString().split('T')[1].split('.')[0]; // Time alone

    return <div className="patient-card" onClick={() => navigate("/patient/"+patient.id)}>
        <div className="patient-card-basic-info">
            <div className={'patient-name-gender-age'}>
                <div className={'patient-card-name'}> {name} </div>
                <div className={'patient-card-gender-age'}>
                    {icon}: <span style={{fontWeight: "bold"}}>{age}</span> Year-Old {sex} </div>
            </div>
            <div className={'patient-phone'}>
                <FaPhone style={{ transform: 'scaleX(-1)'}} />
                <span style={{fontWeight:"bold"}} > Phone </span>: {patient.phone}
            </div>
            <div className={'patient-card-medical'}>
                <div className={'patient-card-medicine-history'}>
                    <FaNotesMedical/>
                    <span style={{fontWeight: "bold"}}> Medical History</span>: {history}
                </div>
                <div className={'patient-card-medicine-history'}>
                    <FaSyringe/>
                    <span style={{fontWeight: "bold"}}> Medications </span>: {medications}
                </div>
            </div>
        </div>

        <div className={'patient-card-date'}>
            <div className={'patient-card-date-title'}> Last Modified At</div>
            <div className={'patient-card-date-value'}>
                <FaCalendar/>
                <span className={'patient-card-date-subtitle'}> Date</span>: {dateUTC}
            </div>
            <div className={'patient-card-date-value'}>
                <FaClock/>
                <span className={'patient-card-date-subtitle'}> Time</span> (UTC): {timeUTC}
            </div>
        </div>
    </div>
}

export default PatientCard;