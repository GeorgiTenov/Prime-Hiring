import {useRef,useState,createContext,useEffect} from "react";
import { Languages } from "../enums/Languages";
import { ProgrammingLanguages } from "../enums/ProgrammingLanguages";
import IDeveloper from "../interfaces/IDeveloper";
import {developers} from "../data/developers";
import "../styles/create.css";


export type ContextType = IDeveloper[] | null;

export const CreateContext = createContext<ContextType>(null);

 const Create = ({children}:any) =>{
  
    const [createdDeveloper,setCreatedDeveloper] = useState<IDeveloper>();
    const [newDevelopers,setNewDevelopers] = useState<IDeveloper[]>();
    const [newDevs,setNewDevs] = useState<IDeveloper[]>(developers);
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

    useEffect(()=>{
      setNewDevelopers(newDevs);
    },[newDevs,newDevelopers]);

  function createDeveloper():IDeveloper{
      let exp;
      let price;
      if(priceRef.current?.value){
        price = parseInt(priceRef.current?.value);
      }

      if(experienceRef.current?.value){
        exp = parseInt(experienceRef.current?.value);
      }
    
        const newDev:IDeveloper = {
          id:Math.random(),
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

      let isDevExist = false;
      if(newDev.pricePerHour && newDev.yearsOfExperience){
        if(newDev.pricePerHour >= 0 && newDev.yearsOfExperience >= 0){
          for(let dev of newDevs){
            if(dev.id === newDev.id){
              isDevExist = true;
            }
          }

          if(!isDevExist){
            setNewDevs([newDev,...newDevs]);
            setNewDevelopers(newDevs);
          }
         
        }
      }
      return newDev;
  }
  
  const handleCreateDev = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const dev = createDeveloper();
        setCreatedDeveloper(dev);
  }

    return(
        <>
        <form  className="form" onSubmit={e => handleCreateDev(e)}>
            <p>Name:</p><input type="text" ref={nameRef} required/>
            <p>Email:</p><input type="email" ref={emailRef} required/>
            <p>Phone:</p><input type="phone" ref={phoneRef} required/>
            <p>Location:</p><textarea ref={locationRef} style={{resize:"none"}} required/>
            <p>Picture URL:</p><input type="text" ref={pictureRef} />
            <p>Price per hour:</p><input type="number" ref={priceRef} required/>
            <p>Technology:</p> <select ref={technologyRef} required>
                {Object.values(ProgrammingLanguages).map((value,index)=>(
                    <option key={index} value={value}>{value}</option>
                ))}
            </select>
            <p>Description:</p><textarea  ref={descriptionRef} style={{resize:"none"}}/>
            <p>Experience:</p><input type="number" ref={experienceRef} required/>
            <p>Native Language:</p>

            <select ref={languageRef} required>
                {Object.values(Languages).map((value,index)=>(
                    <option key={index} value={value}>{value}</option>
                ))}
            </select>

            <p>Linked in:</p><input type="text" ref={linkedInRef}/>
            <br></br>
            <input type="submit" value="Create"/>
        </form>
        <CreateContext.Provider value={newDevs}>
          {children}
        </CreateContext.Provider>
        </>
    )
}

export default Create;