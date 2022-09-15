import React from "react";
import {useState} from 'react'

// just an alert button
function MyButton(){
    function handleClick(){
        alert("woow you clicked me")
    }

    return <button onClick={handleClick}>
            Click me
    </button>
}


// buttons that update seperate
function SecondButton(){
    const [count, setcount] = useState(0);

        function SecondClick(){
            setcount(count + 1);
        }


            return <button onClick={SecondClick}>
                clicked {count} times
            </button>
}

    function TwoButtons(){
        return <div>
            <h1>wow 2 of them</h1>
            <SecondButton/>
            <SecondButton/>
        </div>
}



// buttons that update together



function BUTTON({count, onClick}){
    return <button onClick={onClick}>
        clicked {count} times
    </button>
};


export default function ThirdButton(){
    const [count, setcount] = useState(0);

    function thirdClick(){
        setcount(count +1);
    }

    return <div>
        <h1>buttons that update together</h1>
        <BUTTON count={count} onClick={thirdClick} />
        <BUTTON count={count} onClick={thirdClick} />
        <TwoButtons/>
    </div>
}


