import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage(){
    return (
        <div>
            <div className ={style.landingPageContainer}>
                <div className={style.sectionLeft}>
                    <h1>Henry Videogames APP</h1>
                    <div>
                        <p>
                            This is a Full Stack videogame App where you can find all videogames and even create your own.
                        </p>
                        <h2>Click Home to start</h2>
                    </div>
                    <div className={style.buttonsContainer}>
                        <Link to = "/home">
                            <button className ={style.singleButtonContainer}>Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}