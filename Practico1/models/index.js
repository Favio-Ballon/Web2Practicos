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

db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
db.hamburguesa = require("./hamburguesa.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);

// restaurante tiene n hamburguesas
db.restaurante.hasMany(db.hamburguesa, { as: "hamburguesas" });
db.hamburguesa.belongsTo(db.restaurante, {
    foreignKey: "restauranteId",
    as: "restaurante",
});

// hamburguesa tiene n reviews
db.hamburguesa.hasMany(db.review, { as: "reviews" });
db.review.belongsTo(db.hamburguesa, {
    foreignKey: "hamburguesaId",
    as: "hamburguesa",
});

// usuario tiene n reviews
db.usuario.hasMany(db.review, { as: "reviews" });
db.review.belongsTo(db.usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
});


module.exports = db;