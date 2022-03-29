import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import {postGames, getGenres, getPlatforms} from "../actions"; 
import styles from "./GameCreate.module.css";

function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = "Se requiere un nombre";
    }else if(!input.description){
        errors.description = "se requiere una descripción"
    }else if(!input.released){
        errors.released = "se requiere una fecha de publicación"
    }else if(!input.rating){
        errors.rating = "se requiere una calificación"
    }else if(!input.genres.length > 0){
        errors.genres = "se requiere al menos un genero"
    }else if(!input.platforms.length > 0){
        errors.platforms = "se requiere al menos una plataforma"
    }

    return errors;
}

export default function GameCreated () {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelectPlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postGames(input))
        alert("Juego creado")
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: []
        })
        history.push("/Home")
    }

    function handleDelete (el) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    useEffect(() => {
        dispatch(getPlatforms())
    }, [])



    return (
        <div>
            <div >
                <Link to = "/Home"><button className={styles.singleButtonContainer}>Volver</button></Link>
            </div>
            <h1>PRUEBA CREAR TU JUEGO FANTASMA</h1>
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div >
                    <label>Nombre:</label>
                    <input className={styles.searchBarInput} type = "text" value = {input.name} name = "name" placeholder = "Name..." onChange = {(e) => handleChange(e)}/>
                    {errors.name && (<p>{errors.name}</p>)}  
                </div>
                <div>
                    <label>Descripción:</label>
                    <input className={styles.searchBarInput} type = "text" value = {input.description} name = "description" placeholder = "Description..." onChange = {(e) => handleChange(e)}/>
                    {errors.description && (<p>{errors.description}</p>)}  
                </div>
                <div>
                    <label>Publicado:</label>
                    <input className={styles.searchBarInput} type = "text" value = {input.released} name = "released" placeholder = "Released..." onChange = {(e) => handleChange(e)}/>  
                    {errors.released && (<p>{errors.released}</p>)}  
                </div>
                <div>
                    <label>Rating:</label>
                    <input className={styles.searchBarInput} type = "text" value = {input.rating} name = "rating" placeholder = "Rating..." onChange = {(e) => handleChange(e)}/>  
                    {errors.rating && (<p>{errors.rating}</p>)}
                </div>
                <div className = {styles.filters}>
                    <label> Generos:
                        <select className={styles.singleFilterContainer} onChange={(e) => handleSelect(e)}>
                            {
                                genres.map((ge) => (
                                <option value = {ge.name} key = {ge.id}>{ge.name}</option>
                            ))}
                        </select>
                    </label>
                    {errors.genres && (<p>{errors.genres}</p>)}
                    <label> Plataformas:
                        <select className={styles.singleFilterContainer} onChange = {(e) => handleSelectPlatforms(e)}>
                            {   
                                platforms.map((pl) => (
                                <option value = {pl.name} key = {pl.id}>{pl.name}</option> ))
                                
                            }
                        </select>
                    </label>
                    {errors.platforms && (<p>{errors.platforms}</p>)}
                </div>
                <div>
                    <button className={styles.singleButtonContainer} type = "submit">Crear Juego</button>
                </div>    
            </form>
            {input.genres.map(el => 
                <div>
                    <p>{el}</p>
                    <button onClick ={() => handleDelete(el)}>X</button>
                </div>
                )}
        </div>

    )
        
    
}