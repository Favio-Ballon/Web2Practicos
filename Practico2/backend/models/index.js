const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.peliculas = require("./pelicula.js")(sequelize, Sequelize);
db.repartos = require("./reparto.js")(sequelize, Sequelize);

//pelicula tiene un director 
db.repartos.hasOne(db.peliculas, {
    as: "director",
    foreignKey: "director_id",
});


//reparto tiene muchas peliculas
db.repartos.belongsToMany(db.peliculas, {
    through: "reparto_pelicula",
    as: "peliculas",
    foreignKey: "reparto_id",
});

//pelicula tiene muchos repartos
db.peliculas.belongsToMany(db.repartos, {
    through: "reparto_pelicula",
    as: "repartos",
    foreignKey: "pelicula_id",
});



module.exports = db;