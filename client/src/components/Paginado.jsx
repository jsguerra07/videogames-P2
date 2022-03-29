import React from "react";
import styles from "./Paginado.module.css";

export default function paginado({gamesPerPage, allGames, paginado}) {
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allGames/gamesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav >
            <ul className={styles.prueba}>
                    { pageNumbers && 
                      pageNumbers.map(number => (
                          <li key ={number}>
                            <a className= {styles.singleButtonPagination} onClick={() => paginado(number)}>{number}</a>
                          </li>  
                        ))      
                    }
            </ul>
        </nav>
    )

}