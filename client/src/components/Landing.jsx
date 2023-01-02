import React from "react";
import {Link} from "react-router-dom";
// import style from "./LandingPage.module.css"
import landing from "../countries.png"

export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Welcome to the Countries Individual Project</h1>
            <h3>Developed by Lucas Parra</h3>
            <div>
            <img src={landing} alt="Bienvenid@" />
            <div >
            <Link to ="/home">
                <button >Ingresar</button>
            </Link>
            </div>
            </div>
        </div>
    )
}