module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/image.controller.js");

    router.get("/reparto/:name", controller.getImageReparto);
    router.get("/pelicula/:name", controller.getImagePelicula);

    app.use('/images', router);
}