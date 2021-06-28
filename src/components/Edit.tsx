import React, { createContext } from "react";
import IDeveloper from "../interfaces/IDeveloper";
import {useRef,useContext,useState,useEffect} from "react";
import { ProgrammingLanguages } from "../enums/ProgrammingLanguages";
import { Languages } from "../enums/Languages";
import { CreateContext,ContextType } from "./Create";
import {useParams} from "react-router-dom";
import {developers} from "../data/developers";
import "../styles/create.css";
let newTest = "";
export const EditContext = createContext<ContextType>([]);
type Developer = IDeveloper | null;
export const Edit = ({children}:any) => {
    newTest = "sandwich";
    const [oldDeveloper,setOldDeveloper] = useState<Developer>();
    const [newDeveloper,setNewDeveloper] = useState<Developer>();
    const [newDevelopers,setNewDevelopers] = useState<ContextType>([]);

    const devId = useParams("id").id;
   
    useEffect(()=>{
       const currentDev:any = developers?.find(d => d.id === parseInt(devId));
       setOldDeveloper(currentDev);
    },[devId]);

    function replaceDevelopers(oldDevelopers:IDeveloper[]):IDeveloper[]{
        const newDevs = oldDevelopers.filter(d => d.id !== parseInt(devId));
        return newDevs;
    }

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLTextAreaElement>(null);
    const pictureRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const technologyRef = useRef<HTMLSelectElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLSelectElement>(null);
    const linkedInRef = useRef<HTMLInputElement>(null);

    const handleEditDev = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const replacedDevelopers = replaceDevelopers(developers);
        let exp;
        let price;

      if(priceRef.current?.value){
        price = parseInt(priceRef.current?.value);
      }

      if(experienceRef.current?.value){
        exp = parseInt(experienceRef.current?.value);
      }

        const newDev:IDeveloper = {
            id:parseInt(devId),
            name:nameRef.current?.value,
            email:emailRef.current?.value,
            phoneNumber:phoneRef.current?.value,
            location:locationRef.current?.value,
            profilePicture:pictureRef.current?.value,
            pricePerHour:price,
            technology:technologyRef.current?.value,
            description:descriptionRef.current?.value,
            yearsOfExperience:exp,
            nativeLanguage:languageRef.current?.value,
            linkedIn:linkedInRef.current?.value
        }

        setNewDevelopers([newDev,...replacedDevelopers]);
        
    }
    

    return(
        <>
        <h1>Edit developer with an id of {devId}</h1>
        <form className="form" onSubmit={e => handleEditDev(e)}>
        <p>Name:</p><input type="text" ref={nameRef} required placeholder={oldDeveloper?.name}/>
        <p>Email:</p><input type="email" ref={emailRef} required placeholder={oldDeveloper?.email}/>
        <p>Phone:</p><input type="phone" ref={phoneRef} required placeholder={oldDeveloper?.phoneNumber}/>
        <p>Location:</p><textarea ref={locationRef} style={{resize:"none"}} required placeholder={oldDeveloper?.location}/>
        <p>Picture URL:</p><input type="text" ref={pictureRef} placeholder={oldDeveloper?.profilePicture}/>
        <p>Price per hour:</p><input type="number" ref={priceRef} required placeholder={oldDeveloper?.pricePerHour?.toString()}/>
        <p>Technology:</p> <select ref={technologyRef} required placeholder={oldDeveloper?.technology}>
            {Object.values(ProgrammingLanguages).map((value,index)=>(
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
        <p>Description:</p><textarea  ref={descriptionRef} style={{resize:"none"}} placeholder={oldDeveloper?.description}/>
        <p>Experience:</p><input type="number" ref={experienceRef} required placeholder={oldDeveloper?.yearsOfExperience?.toString()}/>
        <p>Native Language:</p>
    
        <select ref={languageRef} required placeholder={oldDeveloper?.nativeLanguage}>
            {Object.values(Languages).map((value,index)=>(
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
    
        <p>Linked in:</p><input type="text" ref={linkedInRef} placeholder={oldDeveloper?.linkedIn}/>
        <br></br>
        <input type="submit" value="Edit"/>
    </form>
    <EditContext.Provider value={newDevelopers ? newDevelopers : null}>
        {children}
    </EditContext.Provider>
    </>
    )

   
}
export default newTest;