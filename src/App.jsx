import React, { Component } from 'react';
import './App.scss';
// import Shoppinglist from './Boodschap';
import { ReactDOM } from 'react';
// import ThirdButton from './ButtonClicking';
import ListGame from './Mockup';
// import Executeall from './Gamelist';
import Todo from './todolist';
import Hello from './NewPageTodo';
import { BrowserRouter ,Routes, Route, Router } from "react-router-dom";
import { Link } from 'react-router-dom';





<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>




class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Todo/>}></Route>
            <Route path='/NewPage' element={<Hello/>}></Route>
          </Routes>
        </BrowserRouter>      

        
        
      </div>
    );
  }
}





export default App;
