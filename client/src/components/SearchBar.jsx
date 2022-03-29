import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getNameGames } from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    
    function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
        
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(getNameGames(name))
        setName("")
    }

    return (
        <div className={style.searchBar}>
            <input className={style.searchBarInput} type = "text" value = {name} placeholder = "Buscar.." onChange = {(e) => handleInputChange(e)}/>
            <button className={style.singleButtonContainer} type = "submit" onClick = {(e) => handleSubmit(e)}>Buscar</button>
            
        </div>
    )   
}