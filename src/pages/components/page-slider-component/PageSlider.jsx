import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {FaStepBackward, FaStepForward, FaFastForward, FaFastBackward, FaPlus} from "react-icons/fa";

import './PageSlider.css'

const PageSlider = ({domain, mostRecentAction, moreRecentAction, lessRecentAction, leastRecentAction, notes}) => {
    let navigate = useNavigate();

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
                            if (domain === 'patients') navigate('/newPatient')
                            if (domain === 'patient') navigate('/newProcess')
                        }}>
                    <FaPlus/> <span className={'list-add-btn-txt'}> Add Patient </span>
                </button>
            </div>
        </div>
    )
}

export default PageSlider;