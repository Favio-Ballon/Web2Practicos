module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/image.controller.js");

    router.get("/pokemon/:name", controller.getImagepokemon);

    app.use('/images', router);
}