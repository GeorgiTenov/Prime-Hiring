import IDeveloper from "../interfaces/IDeveloper";
import React ,{ useState,useRef,useEffect,useContext,createContext } from "react";
import { IHire } from "../interfaces/IHire";
import {useParams} from "react-router-dom";
import {developers} from "../data/developers";
import { CreateContext } from "./Create";


type HiringType = IHire | undefined;

export const Hire = () => {
    const createdDevs = React.useContext(CreateContext);
  
    const [hiredDevelopers,setHiredDevelopers] = useState<HiringType>();
    const [devs,setDevelopers] = useState<IDeveloper[]>([]);
    const [hiredDev,setHiredDev] = useState<IHire>();
    const [localStorageData,setLocalStorageData] = useState<IHire>();

  
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const idParam = useParams("hireId");
    const hireId = parseInt(idParam.hireId);
    
    const getDev = () =>{
        const dev:IDeveloper | undefined = developers.find(d => d.id === hireId);
        return dev;
    }
    
    useEffect(()=>{
        const storageData = window.localStorage.getItem("hiredDevs");
        try{
            if(storageData) setLocalStorageData(JSON.parse(storageData));
        }catch(e){
            console.log(e);
        }
       
        if(localStorageData) setHiredDevelopers(localStorageData);

        else setHiredDevelopers(hiredDev);

        console.log("Hired:",hiredDevelopers);
    },[hiredDev]);

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const startDate = startDateRef.current?.valueAsDate;

        const endDate = endDateRef.current?.valueAsDate;

        const developer:IDeveloper | undefined = getDev();

        const areDatesValid = dateCheck(startDate,endDate);

        if(developer){
            const checkExistance = checkDevExistance(developer);

            if(!checkExistance)  setDevelopers([developer,...devs]);
           
        }
        

        const hiringInfoDev:IHire = {
            startDate:startDateRef.current?.value,
            endDate:endDateRef.current?.value,
            developers:devs
        } 


        if(areDatesValid){
            setHiredDev(hiringInfoDev);
            setHiredDevelopers(hiringInfoDev);
        }
     
       
       window.localStorage.setItem("hiredDevs",JSON.stringify(hiredDevelopers));

       const storageData = window.localStorage.getItem("hiredDevs");

       try{
        if(storageData != null){
            const parsedData = JSON.parse(storageData);
            setLocalStorageData(parsedData);
           }
       }catch(e){
           console.log(e);
       }
       
    }
    
    function checkDevExistance(dev:IDeveloper):boolean{
        const isDevExist = devs.some(d => d.id === dev.id);
        return isDevExist;
    }

    type DataType = Date | null | undefined; 

    function dateCheck(startDate:DataType,endDate:DataType):boolean{
        if(startDate && endDate)
        return startDate < endDate;

        return false;
    }   

     return(
         <>
         <form onSubmit={e => handleSubmit(e)}>
             <p>Start Date:</p><input type="date" ref={startDateRef}/>
             <p>End Date:</p><input type="date" ref={endDateRef}/>
             <input type="submit"/>
         </form>
         </>
     )
}