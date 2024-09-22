module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controller.js");

    router.post("/", controller.listReparto);

    router.post("/create", controller.createReparto);

    router.get('/:id', controller.getRepartoById);

    router.post('/', controller.createReparto);

    router.put('/:id', controller.updateRepartoPut);
    router.patch('/:id', controller.updateRepartoatch);
    router.delete('/:id', controller.deleteReparto);

    app.use('/api/reparto', router);
}
