module.exports = app => {
    require("./reparto.routes")(app);
    require("./pelicula.routes")(app);
};