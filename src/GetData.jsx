import React, { useState } from "react";



const FetchingData = () => {
    const [NewTodo, setNewTodo] = useState([""]);

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    fetch('http://localhost:8080/api/todos', options)
      .then(response => response.json())
      .then(response => { console.log(response); setNewTodo(response.Todo) })
      .catch(err => console.error(err));  

     // JSON.stringify(data)
     

      console.log(NewTodo)
      
}





  export default FetchingData