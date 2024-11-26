import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import data from './database.json'
import {useState} from 'react';

class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    console.log(data);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Andisor</h1>
        </header>
        <div className="hori">
        <ul>{data.map((i)=><Comp prod={i}/>)}</ul>
  
        </div>
      </div>
    </Router>
    );
  }
}

function Comp(props){
  const [exp, setExp] = useState(0);

  if (exp==props.prod.id) {  return <div>
              <button onClick={()=>setExp(props.prod.id)}>{props.prod.title}  Price:  {props.prod.price}</button>
              <p>{props.prod.primary_variants.map((i)=>
                    <p >{i.name}  Price:  {i.price}</p>)}</p>
          </div>} else {  return <div>
              <button onClick={()=>setExp(props.prod.id)}>{props.prod.title}  Price:  {props.prod.price}</button>
          </div>}

}
export default App;
