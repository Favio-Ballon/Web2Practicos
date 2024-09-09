module.exports = app => {
    let router = require("express").Router();

    const controller = require("../controllers/hamburguesa.controller.js");

    router.get("/:restauranteId/menu", controller.listHamburguesas);

    router.get("/:restauranteId/menu/create", controller.createHamburguesa);
    router.post("/:restauranteId/menu/create", controller.insertHamburguesa);

    router.get("/:restauranteId/menu/:id/edit", controller.editHamburguesa);
    router.post("/:restauranteId/menu/:id/edit", controller.updateHamburguesa);

    router.post("/:restauranteId/menu/:id/delete", controller.deleteHamburguesa);



    app.use("/restaurantes", router);
}