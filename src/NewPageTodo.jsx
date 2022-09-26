import React from "react";
import { Link } from "@mui/material";
import "./newPage.scss"

const Hello = () => {
    const CatImage = () => {
        return(
        <a>
            <img  className="coolCat"src="https://i.im.ge/2022/09/23/10udUW.sunglasses-cool.png" 
            alt="sunglasses cool" border="0" />
        </a>)
    }
 

    const MadeBy= () => {
        return(
            <div>
                <h1 className="begin">
                    this was made by:
                </h1>
                <h2 className="name">
                    Brenda
                </h2>
            </div>
        )}

    
    

    return(
        <div>
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
        </div>
    )
    
}



export default Hello