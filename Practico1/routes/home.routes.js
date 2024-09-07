module.exports = app => {
    let router = require("express").Router();

    const controller = require("../controllers/restaurante.controller.js");

    router.get("/", controller.listRestauranteUsuario);

    app.use("", router);
}