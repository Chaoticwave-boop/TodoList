import React from "react";

const FetchingData = () => {
    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    fetch('http://localhost:8080/api/todos', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));  

    
}





  export default FetchingData