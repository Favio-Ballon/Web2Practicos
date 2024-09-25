module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controller.js");

    router.get("/", controller.listReparto);
    router.get('/:id', controller.getRepartoById);

    router.post("/create", controller.createReparto);


    router.put('/:id', controller.updateRepartoPut);
    router.delete('/:id', controller.deleteReparto);

    app.use('/reparto', router);
}
