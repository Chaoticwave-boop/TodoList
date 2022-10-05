import React from "react";
import { Link } from "@mui/material";
import "./newPage.scss"
import { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from "react";
import SwitchNight from "./switch";

const Hello = () => {
    const [theme, setTheme] = useState("light")
    const [Highfive, setHighfive] = useState("")
    const [num, setNum] = useState();
    const [color, setColor] = useState("purple")
    
    const CatImage = () => {
        return(
        <a>
            <img  className="coolCat"src="https://i.im.ge/2022/10/05/1zmyHc.sunglasses-cool-removebg-preview.png" 
            alt="sunglasses cool" border="0" />
        </a>)
    }
 

    const MadeBy = () => {
        return(
            <div>
                <h1 className="begin">
                    brought to you by:
                </h1>
                <h2 className="name">
                    Brenda
                </h2>
                <img src="https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif" className="explosion"></img>
                <div className="thanks">
                    <h3>special thanks to :</h3>
                    <p>todoCat</p>
                </div>
            </div>
        )}

    const Images = () => {
        return(
            <div>
                <img src="https://static.wixstatic.com/media/273887_4858969d0914406784b70f2c520d3044~mv2.gif" className="twinkle"></img>
                <img src="https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif" className="thankyou"></img>
                <img src="https://i.pinimg.com/originals/a4/1d/64/a41d64bf3abcca049f9278a68ff12719.gif" className="dance"></img>
            </div>
        )
    }

    const DarkMode = () => {
        if (theme === "light"){
            setTheme("dark")
            setColor("black")
        }
        else setTheme("light"), setColor("purple")
    }
    useEffect(() => {
        document.body.className = theme;
    },[theme]);
    
    const HighFive = () => {
        useEffect(()=>{
            const firstImage = setTimeout(()=> {
                setHighfive("https://media.tenor.com/BziKdyHBGN4AAAAM/high-five-self-high-five.gif")
                setNum(randomNumberRange(0, 2))
            },1000)
                     
        },[Highfive])
        return <div>
            <h3 className="highText">High five!</h3>
        </div>
    };
  
    const randomNumberRange = (min,max) =>{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }; 
    
    return(
        <div >
            <h2>
                <Link href="http://127.0.0.1:5173" underline="hover" className="Link2" style={{color: color}}>
                    HomePage
                </Link>
            </h2>
            <h1 className="Nav">
                Information
            </h1>
            <CatImage/>
            <MadeBy/>
            <Images/> 
            <FormGroup>
                <FormControlLabel control={<SwitchNight  sx={{ m: 1 }} onClick={DarkMode}/>} label="Enable Darkmode" className="darkmode" />
            </FormGroup>
            <img src={Highfive} className="Highfive"></img>
            <HighFive/>
        </div>
    )   
}



export default Hello