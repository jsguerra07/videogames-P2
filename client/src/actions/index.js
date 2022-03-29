import axios from "axios";

export function getGames(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch ({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getNameGames(payload){
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + payload);
            return dispatch ({
                type: "GET_NAME_GAMES",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getGenres() {
    return async function (dispatch){
        var json = await axios.get ("http://localhost:3001/genres")
        return dispatch ({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function getPlatforms () {
    return async function (dispatch){
        var json = await axios.get ("http://localhost:3001/platforms")
        return dispatch ({
            type: "GET_PLATFORMS",
            payload: json.data
        })
    }

}

export function postGames(payload) {
    return async function (dispatch) {
        const json = await axios.post("http://localhost:3001/videogame", payload);// const json = await axios.post("http://localhost:3001/game", payload);
        console.log(json)
        return json;
    }
}


export function filterGamesByGenres(payload){
    console.log(payload);
    return {
        type: "FILTER_BY_GENRES",
        payload
    }
}

export function filterCreated (payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + id);
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}
