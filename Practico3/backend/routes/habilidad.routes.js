module.exports = app => {
    let router = require("express").Router();

    const controller = require("../controllers/habilidad.controller.js");

    router.get("/", controller.listHabilidad);
    router.get("/:id", controller.getHabilidadById);

    router.post("/create", controller.createHabilidad);

    router.put('/:id', controller.updateHabilidad);

    router.delete('/:id', controller.deleteHabilidad);

    app.use('/habilidad', router);
}