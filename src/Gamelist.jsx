import React from "react";
import { useState } from "react";



const ChangeTextOnCommand = () => {
    const [message, setMessage] = useState( '' );
  
    return (
      <div>
        <input
           type="text"
           value={message}
           placeholder="Enter a message"
           onChange={e => setMessage(e.target.value)}
         />
        <p>
          <strong>{message}</strong>
        </p>
      </div>
    );
  };






function Textchange (){
    const [setText, ChangeText] = useState('THIS IS A TEST')

    const updatetext = () => {
        ChangeText("this is a change")
    } 

    return(
        <div>
            <h1>{setText}</h1>
            <button onClick={() => updatetext()}>update text</button>
        </div>
    )
}





export default Textchange


