module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller.js");

    router.get("/", controller.listPelicula);
    router.get('/:id', controller.getPeliculaById);

    router.post("/create", controller.createPelicula);

    router.put('/:id', controller.updatePeliculaPut);

    router.delete('/:id', controller.deletePelicula);

    app.use('/pelicula', router);
}