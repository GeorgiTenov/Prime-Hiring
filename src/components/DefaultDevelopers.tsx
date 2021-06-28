import {developers} from "../data/developers";
import { Developer } from "./Developer";
import { useState,useRef,useEffect } from "react";
import IDeveloper from "../interfaces/IDeveloper";
import {Link} from "react-router-dom";
import "../styles/defaultDevelopers.css";
export const DefaultDevelopers = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [devs,setDevs] = useState<IDeveloper[]>();

    useEffect(()=>{
        if(!devs) setDevs(developers);
    },[devs]);

    function handleSearch(){
        const search = searchRef.current?.value;
        if(search){
            const searchedDevs = devs?.filter(s => s.name?.toLowerCase().trim().includes(search.toLowerCase())); 
            setDevs(searchedDevs);
        }

        if(search === "") setDevs(developers);
     
    }

    return(
        <div>
            <Link className="create-link" to="/create">Create</Link>
            <br></br>
            <input id="search-field" type="text" placeholder="Enter developer name..." ref={searchRef} onChange={handleSearch}/>
        <ul className="devs">
            {devs && devs.map((developer,index)=>(
                <li key={index}>
                    <Developer {...developer}></Developer>
                </li>
            ))}
        </ul>
        </div>
    )
}