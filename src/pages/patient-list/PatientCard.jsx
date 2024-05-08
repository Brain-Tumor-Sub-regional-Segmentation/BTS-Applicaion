import './PatientCard.css'
import {useNavigate} from "react-router-dom";

import {FaPhone, FaNotesMedical, FaSyringe, FaCalendar, FaClock, FaGlobe} from 'react-icons/fa'

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
    let localDate = date.toLocaleDateString();
    let localTime = date.toLocaleTimeString();
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return <div className="patient-card" onClick={() => navigate("/home/patient/"+patient.id)}>
        <div className="patient-card-basic-info">
            <div className={'patient-name-gender-age'}>
                <div className={'patient-card-name'}> {name} </div>
                <div className={'patient-card-gender-age'}>
                    {icon}: <span style={{fontWeight: "bold"}}>{age}</span> Year-Old {sex} </div>
            </div>
            <div className={'patient-phone'}>
                <FaPhone className={'patient-card-icon'} />
                <span style={{fontWeight:"bold"}} > Phone </span>: {patient.phone}
            </div>
            <div className={'patient-card-medical'}>
                <div className={'patient-card-medicine-history'}>
                    <FaNotesMedical className={'patient-card-icon'} />
                    <span style={{fontWeight: "bold"}}> Medical History</span>: {history}
                </div>
                <div className={'patient-card-medicine-history'}>
                    <FaSyringe className={'patient-card-icon'}/>
                    <span style={{fontWeight: "bold"}}> Medications </span>: {medications}
                </div>
            </div>
        </div>

        <div className={'patient-card-date'}>
            <div className={'patient-card-date-title'}>
                Last Modified At
            </div>
            <div className={'patient-card-date-body'}>
                <div className={'patient-card-medicine-history'}>
                    <FaCalendar className={'patient-card-icon'}/>
                    <span style={{fontWeight: "bold"}}> Date</span>: {localDate}
                </div>
                <div className={'patient-card-medicine-history'}>
                    <FaClock className={'patient-card-icon'}/>
                    <span style={{fontWeight: "bold"}}> Time </span>: {localTime}
                </div>
                <div className={'patient-card-medicine-history'}>
                    <FaGlobe className={'patient-card-icon'}/>
                    <span style={{fontWeight: "bold"}}> Timezone </span>: {localTimeZone}
                </div>
            </div>
        </div>
    </div>
}

export default PatientCard;