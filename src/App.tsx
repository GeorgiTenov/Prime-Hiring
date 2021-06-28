import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Create  from './components/Create';
import {Developers} from "./components/Developers";
import {Edit} from "./components/Edit";
import {Route} from "react-router-dom";
import {DefaultDevelopers} from "./components/DefaultDevelopers";
import {Hire} from "./components/Hire";
import {CreateContext} from "./components/Create";
import { developers } from './data/developers';

function App() {
 
  return (
    <div className="App">
      <Route path="/edit/:id">
        <Edit>
          <Developers></Developers>
        </Edit>
        </Route>

      <Route path="/create">
        <Create>
          <Developers></Developers>
          </Create>
      </Route>

      <CreateContext.Provider value={developers}>
        <Route path="/hire/:hireId"><Hire></Hire></Route>
      </CreateContext.Provider>
      
     <Route path="/" exact><DefaultDevelopers></DefaultDevelopers></Route>
    
    </div>
  );
}

export default App;
