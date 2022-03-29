import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getGames, filterGamesByGenres, filterCreated, orderByName} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./Home.module.css"; 


export default function Home (){
    const dispatch = useDispatch()
    const allGames = useSelector ((state) => state.games)//me trae del reducer el estado games que tiene todos los personajes
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const [order, setOrder] = useState("")
    const indexOfLastGame = currentPage * gamesPerPage // 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // 0
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)
    
    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //console.log (allGames);
    useEffect (() => {
        dispatch(getGames());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();//evita que se recargue la página
        dispatch(getGames());
    }

    function handleFilterGenres(e){
        dispatch(filterGamesByGenres(e.target.value));
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    }

    function handleSort (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={style.homeContainer}>
            <div className={style.header}>
                <div className ={style.title}>
                    <h1>Videogames</h1>
                </div>
            </div>
            <button className = {style.singleButtonContainer} onClick={e => {handleClick(e)}}>
                volver a cargar todos los juegos
            </button>
            <div className = {style.searchBar} >
                <Link className = {style.singleButtonContainer} to = "/game">Crear Juego</Link>
            </div>
            <div className = {style.search}>
                    <SearchBar/> 
            </div>
            <div>
                <div className = {style.filters}>
                    <select className ={style.singleFilterContainer} onChange = {e => handleSort(e)}>
                        <option value = "Asc" >Ascendente</option>
                        <option value = "Desc" >Descendente</option>
                    </select>
                    <select className ={style.singleFilterContainer} onChange = {e => handleFilterGenres(e)}>
                        <option value = "All" key = "1a">Todos los generos</option>
                        <option value = "Action" key = "1b">Acción</option>
                        <option value = "Adventure" key = "1c">Adventure</option>
                        <option value = "Arcade" key = "1d">Arcade</option>
                        <option value = "Board Games" key = "1e">Board Games</option>
                        <option value = "Card" key = "1f">Card</option>
                        <option value = "Casual" key = "1g">Casual</option>
                        <option value = "Educational" key = "1h">Educational</option>
                        <option value = "Family" key = "1i">Family</option>
                        <option value = "Fighting" key = "1j">Fighting</option>
                        <option value = "Indie" key = "1k">Indie</option>
                        <option value = "Massively Multiplayer" key = "1l">Massively Multiplayer</option>
                        <option value = "Platformer" key = "1m">Platformer</option>
                        <option value = "Puzzle" key = "1n">Puzzle</option>
                        <option value = "RPG" key = "1o">RPG</option>
                        <option value = "Racing" key = "1p">Racing</option>
                        <option value = "Shooter" key = "1q">Shooter</option>
                        <option value = "Simulation" key = "1r">Simulation</option>
                        <option value = "Sports" key = "1s">Sports</option>
                        <option value = "Strategy" key = "1t">Strategy</option>

                    </select> 
                    <select className ={style.singleFilterContainer} onChange = {e => handleFilterCreated(e)}> 
                        <option value = "All" >Todos</option>
                        <option value = "created" >Creados</option>
                        <option value = "api" >Existentes</option>
                    </select>
                </div>
                       
                {
                    currentGames?.map(el => {
                        return(
                            <> 
                                <div className ={style.displayGames}>
                                    <Link to = {"/Home/" + el.id}>
                                        <Card name = {el.name} image ={el.background_image} genres = {el.genres.map((gr) => gr.name).join(" ")} key = {el.id}/>
                                    </Link>
                                </div>
                                
                            </>
                            
                        );
                        
                        
                    })
                }

                <div className= {style.filters}>
                    <Paginado 
                            gamesPerPage = {gamesPerPage}
                            allGames = {allGames.length}
                            paginado = {paginado}  
                    />  
                </div>
            </div>
        </div>
    )

}