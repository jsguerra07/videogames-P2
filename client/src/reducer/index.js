
const initialState = {
    games : [],
    allGames: [],
    genres: [],
    detail: [],
    platforms:[]

};


function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_VIDEOGAMES":
            return {
                ...state,
                games: action.payload,
                allGames: action.payload

            }

        case "GET_NAME_GAMES":
            return {
                ...state,
                games: action.payload
            }

        case "POST_GAME":
            return {
                ...state,
            } 

        case "GET_GENRES":
            const genresSort = action.payload.sort(function (a, b) {
                if (a.name > b.name ) {
                    return 1;
                }
                if (a.name < b.name ) {
                    return -1;
                }
                return 0;

            })
            return {
                ...state,
                genres: genresSort

        }  

        case "GET_PLATFORMS":
            const platformsSort = action.payload.sort(function (a, b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                platforms: platformsSort
            }
        
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }
            
        case "FILTER_BY_GENRES":
            
            const allGames = state.allGames
            console.log(allGames)
            console.log(action.payload)
            const genresFiltered = action.payload === "All" ? allGames 
            : allGames.filter(el => {
                let gen = false;
                el.genres.map((g) => {
                   if(g.name === action.payload) {
                       gen = true;
                   }
                })
                if(gen === true) return el;
                })
            console.log(genresFiltered)
            return {
                ...state,
                games: genresFiltered
            }
        case "FILTER_CREATED":
            //const allGames2 = state.allGames
            const createdFiltered = action.payload === "created" ? state.allGames.filter(el => el.createInDb) : state.allGames.filter(el => !el.createInDb)
            return {
                ...state,
                games: action.payload === "All" ? state.allGames : createdFiltered
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "Asc" ?
            state.games.sort(function (a, b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }):
            state.games.sort(function (a, b){
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                games: sortedArr
            }    
        default: 
            return state;    
    }
}

export default rootReducer;