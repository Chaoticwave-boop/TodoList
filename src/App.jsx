import React, { Component } from 'react';
import './App.scss';
// import Shoppinglist from './Boodschap';
import { ReactDOM } from 'react';
// import ThirdButton from './ButtonClicking';
import ListGame from './Mockup';
// import Executeall from './Gamelist';
import Todo from './todolist';
import { BrowserRouter, Routes, Route } from "react-router-dom";




<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>




class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Shoppinglist/>
        <ThirdButton/>
        
        <Executeall/> */}
        <Todo/>
       
      </div>
    );
  }
}





export default App;
