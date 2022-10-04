import React from "react";
import { Link } from "@mui/material";
import "./newPage.scss"
import { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect } from "react";



const Hello = () => {
    const [theme, setTheme] = useState("light")

    const CatImage = () => {
        return(
        <a>
            <img  className="coolCat"src="https://i.im.ge/2022/09/23/10udUW.sunglasses-cool.png" 
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
                <img src="https://media.itsnicethat.com/original_images/giphy-2021-gifs-and-clips-animation-itsnicethat-02.gif" className="dance"></img>
            </div>
        )
    }

    const DarkMode = () => {
        if (theme === "light"){
            setTheme("dark")
        }
        else (
            setTheme("light")
        )
    }
    useEffect(() => {
        document.body.className = theme;
    },[theme]);
    

    return(
        <div >
            <h2>
                <Link href="http://127.0.0.1:5173" underline="hover" className="Link2">
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
                <FormControlLabel control={<Switch onClick={DarkMode}/>} label="Enable Darkmode" className="darkmode" />
            </FormGroup>
   
        </div>
    )
    
}



export default Hello