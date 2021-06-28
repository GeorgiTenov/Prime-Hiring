import { developers } from "../data/developers"
import { Developer } from "./Developer"
import {useState,useContext,useEffect} from "react";
import IDeveloper from "../interfaces/IDeveloper";
import { CreateContext } from "./Create";
import { EditContext } from "./Edit";
import "../styles/defaultDevelopers.css";

export const Developers = ()=>{
    const [devs,setDevs] = useState<IDeveloper[]>([]);
    const [areDevsEmpty,setDevsEmpty] = useState<boolean>(true);
    const newDevs = useContext<IDeveloper[] | null>(CreateContext);
   

    useEffect(()=>{
        if(newDevs) setDevs(newDevs);
    },[newDevs]);

    function deleteDeveloper(id:number){
        let filteredDevs = [];
        if(devs.length <= 0)
            filteredDevs = developers.filter(devs => devs.id !== id);

        else filteredDevs = devs.filter(devs => devs.id !== id);
         
        setDevs(filteredDevs);
        setDevsEmpty(false);
    }

    return(
        <ul className="devs">
            { areDevsEmpty && newDevs ? newDevs.map((developer,index)=>(
                <li key={index}>
                    <Developer {...developer}></Developer>
                    <button className="delete-btn" onClick={() => deleteDeveloper(developer.id)}>Delete</button>
                    </li>
            )): devs.map((dev,index)=>(
                <li key={index}>
                     
                     <Developer {...dev}></Developer>
                    <button  className="delete-btn" onClick={() => deleteDeveloper(dev.id)}>Delete</button>
                </li>
            ))}
            {!areDevsEmpty && !devs && !newDevs && developers.map((developer,index)=>(
                <li key={index}>
                <Developer {...developer}></Developer>
                <button className="delete-btn" onClick={() => deleteDeveloper(developer.id)}>Delete</button>
                </li>
            ))}
        </ul>
      
    )
}