import {useState} from 'react'

import {useSearchForPatients} from '../../hooks/useSearchForPatients'

import {FaSearch } from 'react-icons/fa'
import './SearchComponent.css'

const SearchComponent = () => {
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
        </div>
        {searchInput && !loading && <div className="search-results">
            {patients.map(p => <div className="search-result"> {p.name} </div>)}
        </div>}
    </div>;
}

export default SearchComponent