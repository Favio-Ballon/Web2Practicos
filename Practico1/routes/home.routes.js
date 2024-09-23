module.exports = app => {
    let router = require("express").Router();

    const { requireUser } = require("../middlewares/requires-user.js");

    const controller = require("../controllers/restaurante.controller.js");
    const controllerHamburguesa = require("../controllers/hamburguesa.controller.js");
    const controllerUsuario = require("../controllers/usuario.controller.js");

    router.get("/login", controllerUsuario.login);
    router.post("/login", controllerUsuario.authenticate);
    router.get("/register", controllerUsuario.createUsuario);
    router.post("/register", controllerUsuario.insertUsuario);
    router.get("/logout", controllerUsuario.logout);

    router.get("/", controller.listRestauranteUsuario)
    router.get("/:restauranteId", controller.menuRestaurante);
    router.get("/hamburguesa/:id", controllerHamburguesa.hamburguesaDetail);

    router.get("/hamburguesa/:id/review", requireUser,controllerUsuario.createReview);
    router.post("/hamburguesa/:id/review", requireUser,controllerUsuario.insertReview);


    app.use("", router);
}