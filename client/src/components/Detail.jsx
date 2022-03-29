import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import {useEffect} from "react";
import styles from "./Detail.module.css";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myGame = useSelector ((state) => state.detail)
    console.log(myGame)
    return (
       <div>
            {
                myGame.length > 0 ?
                <div className ={styles.figure}>
                   
                        <h1>{myGame[0].name}</h1>
                        <img  src = {myGame[0].background_image} alt = "Detail image"/>
                        <div className= {styles.detailTextContainer}>
                            <h2>Released: {myGame[0].released}</h2>
                            <h2>Rating: {myGame[0].rating}</h2>
                            <h2>Platforms:{myGame[0].platforms}</h2>
                            <h2>Genres: {myGame[0].genres.map((g) => g.name)}</h2>
                            <div>
                                <h2>Description: Lorem ipsum dolor sit amet</h2>
                            </div>
                        </div>
                    
                </div>: <h1>Loading...</h1>
            }
            <div>
                <Link to = "/Home">
                    <button className={styles.singleButtonContainer}>Back</button>
                </Link>
            </div>
        </div>
    ) 
} 

