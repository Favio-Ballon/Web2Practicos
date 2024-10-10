module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo.controller.js");

    router.get("/", controller.listTipo);
    router.get("/:id", controller.getTipoById);

    router.post("/create", controller.createTipo);

    router.put('/:id', controller.updateTipo);

    router.delete('/:id', controller.deleteTipo);

    app.use('/tipo', router);
}