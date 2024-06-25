import {useNavigate} from "react-router-dom";
import {FaStepBackward, FaStepForward, FaFastForward, FaFastBackward, FaPlus} from "react-icons/fa";
import {useState} from "react";
import Popup from "../pages/popup/Popup";
import './PageSlider.css'

const PageSlider = ({domain, mostRecentAction, moreRecentAction, lessRecentAction, leastRecentAction, notes}) => {
    let navigate = useNavigate();
    console.log(notes)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        setIsPopupOpen(true);
    };
    
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    
    return (<div className={'list-page-slider-add-btn'}>
        <div className={'list-slider'}>
            <div className={'list-slider-btns'}>
                <button className={'slider-backward-forward'} onClick={mostRecentAction}>
                    <FaFastBackward className={'slider-backward-forward-icon'}/> Most Recent
                </button>

                <button className={'slider-backward-forward'} onClick={moreRecentAction}>
                    <FaStepBackward className={'slider-backward-forward-icon'}/> More Recent
                </button>

                <button className={'slider-backward-forward'} onClick={lessRecentAction}>
                    Less Recent <FaStepForward className={'slider-backward-forward-icon'}/>
                </button>

                <button className={'slider-backward-forward'} onClick={leastRecentAction}>
                    Least Recent <FaFastForward className={'slider-backward-forward-icon'}/>
                </button>
            </div>

            {notes !== '' && <div className={'list-slider-notes'}> {notes} </div>}

        </div>

        <div className={'list-add-btn-div'}>
        <button className={'list-add-btn'}
                    onClick={() => {
                        if (domain === 'patients') navigate('/home/newPatient')
                        if (domain === 'patient') {
                                openPopup()
                        }
                    }}>
            <FaPlus/>
            {domain === 'patients' && (<span className={'list-add-btn-txt'}> Add Patient </span>)}
            {domain === 'patient' && (<span className={'list-add-btn-txt'}> Add Process </span>)}
            </button>
            {isPopupOpen && <Popup onClose={closePopup} />}
        </div>
        </div>
    )
}

export default PageSlider;