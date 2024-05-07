import './ProcessCard.css'
import {useState} from "react";
import {FaCalendar, FaClock, FaGlobe, FaBrain} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const ProcessCard = ({process}) => {
    let [fullReport, showReport] = useState(false);
    let navigate = useNavigate();

    let lastModified = process.date.seconds
    let date = new Date(lastModified * 1000)
    let localDate = date.toLocaleDateString();
    let localTime = date.toLocaleTimeString();
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (<div className={'process-card'}>
        <div className={'process-card-info'}>
            <div className={'process-card-name'}>{process.name}</div>
            <div className={'process-card-subtitle'}> Report </div>
            <div className={'process-card-report'}>
                {(!fullReport && process.notes.length > 350)? (process.notes.slice(0, 350) + " ...") : process.notes}
                { process.notes.length > 350 && <button onClick={() => {showReport(!fullReport)}} className={'more-less-btn'}>
                    Show {fullReport ? 'less' : 'more'}
                </button>}
            </div>
        </div>
        <div className={'process-card-date'}>
            <div className={'patient-card-date-title'}>
                Created At
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
                <div className={'process-view-plot'}>
                    <button onClick={() => navigate(`/process/${process.id}`)}> Review </button>
                </div>
            </div>
        </div>

    </div>)
}

export default ProcessCard;