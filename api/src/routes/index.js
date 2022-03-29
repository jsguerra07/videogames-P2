require('dotenv').config(); 
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const {API_KEY, DB_USER} = process.env;
const {Videogame, Genre} = require("../db");
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiGames = async () => { // traigo de la api los juegos
    //console.log(API_KEY)
    //console.log(DB_USER)

    //const apiUrl = await axios.get("https://api.rawg.io/api/games?key=e39beff34df645b88aaafe25498439b2"); 
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);//Solo trae 20 resultados
    const apiInfo = await apiUrl.data.results.map (g => { // selecciono info de interes traida por la api // description no aparece en este endpiont
        return {
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            released: g.released,
            rating: g.rating, 
            platforms: g.platforms.map (g => {
                return  g.platform.name; 
                }),
            genres: g.genres.map (g => {
                return {name: g.name, id: g.id}
                }),
        };
    });
    console.log(apiInfo)
    return apiInfo; 
};

const getdbGames = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ["name"], 
            through: {
                attributes: [],
            },
        }
    }) 
}

const getAllGames = async () => {
    const apiGames = await getApiGames(); 
    const dbGames = await getdbGames();
    const allGames = apiGames.concat(dbGames);
    return allGames;
}

router.get("/videogames", async (req, res) => {
    const name = req.query.name;
    const allGamesAll = await getAllGames();
    if(name){
        let gameByName = allGamesAll.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
        gameByName.length ? res.status(200).send(gameByName) : res.status(404).send("The game doesn´t exist")

    }else {
        res.status(200).send(allGamesAll)
    }
});



router.get("/genres", async (req, res) => {
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genresList = apiGenres.data.results.map(gl => {
        return {
            id: gl.id,
            name: gl.name,
        }
    });
    console.log(genresList);
    genresList.forEach(gl => {
        Genre.findOrCreate({
            where: {name: gl.name, id: gl.id}
        });  
        
    }); 

    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
})

router.get("/platforms", async (req, res) => {
    const apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const platformsList = apiPlatforms.data.results.map((pl) => {
        return {
            id: pl.id, 
            name: pl.name
        }
    })
    //console.log(platformsList)
    res.status(200).send(platformsList)
})

router.post("/videogame", async (req, res) => {
    const {
        name,
        description,
        released,
        rating,
        createdInDb,
        genres,
        platforms
    } = req.body;

    const gameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        createdInDb,
        platforms
    })
    console.log(gameCreated)
    console.log(genres, "------------------------------------------------")
    console.log(req.body, "------------------------------------------------")
    let genreDb = await Genre.findAll({
        where: {name: genres}
    }) 
    
    console.log(genreDb)
    gameCreated.addGenre(genreDb)
    res.send(`videogame was created succesfully`)

});

router.get("/videogame/:id", async (req, res) => {
    const id = req.params.id;
    const allGames = await getAllGames();
    if(id){
        let gameById = await allGames.filter( g => g.id == id)
        gameById.length?
        res.status(200).json(gameById):
        res.status(404).send("Didn´t found a game with that ID")
    }

})






module.exports = router;
