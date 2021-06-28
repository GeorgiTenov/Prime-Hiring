import IDeveloper from "../interfaces/IDeveloper";
import { Edit } from "./Edit";
import {Link,Route} from "react-router-dom";
import "../styles/developer.css";
import { Hire } from "./Hire";
import {useState,useEffect} from "react";

export const Developer:React.FC<IDeveloper> = (currentDeveloper:IDeveloper) => {

    return(
        <div>
            <h1 className="text-h1">Name:{currentDeveloper.name}</h1>
            <p className="text">Email:{currentDeveloper.email}</p>
            <p className="text">Description:{currentDeveloper.description}</p> 
            <Link className="edit-link" to={`/edit/${currentDeveloper.id}`}>Edit</Link>
            <Link className="edit-link" to={`/hire/${currentDeveloper.id}`}>Hire</Link>
        </div>
    )
}