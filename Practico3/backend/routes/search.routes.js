module.exports = app => {
   let router = require("express").Router();
    const controller = require("../controllers/search.controller.js");

    router.get("/:name", controller.getBuscador);
    
    router.get("/tipo/:tipo", controller.getPokemonByTipo);
    router.get("/pokemon/:name", controller.getPokemonByName);

    app.use('/search', router);
}