import {useState} from 'react'

import {useSearchForPatients} from '../hooks/useSearchForPatients'

import {FaSearch, FaTimes} from 'react-icons/fa'
import './SearchComponent.css'
import {useNavigate} from "react-router-dom";

const SearchComponent = () => {
    let navigate = useNavigate()
    let [searchInput, setSearchInput] = useState('')
    let {patients, loading} = useSearchForPatients(searchInput)

    // console.log(patients)

    return <div className="search-component">
        <div className={'search-div'}>
            <FaSearch color="#09095F"/>
            <input type={'text'}
                   className="search-bar"
                   placeholder={"Search for patients with anything"}
                   value={searchInput}
                   onChange={(e) => {setSearchInput(e.target.value)}}
            />
            <FaTimes className={"x-sign-search-bar"} onClick={() => {setSearchInput('')}}/>
        </div>
        {searchInput && !loading && <div className="search-results">
            {patients.map(p => <div className="search-result" key={p.id}
                onClick={() => navigate('/patient/' + p.id)}>
                {p.name} </div>)}
        </div>}
    </div>;
}

export default SearchComponent