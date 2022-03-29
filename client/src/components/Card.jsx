import React from "react";
import style from "./Card.module.css";

export default function Card({name, image, genres  }) {//name, background_image, genres, (released, raiting)
    return (
        <div className={style.figure}>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src ={image} alt = "videogame image" width = "350px" height = "200 px"/>
        </div>
    );
}