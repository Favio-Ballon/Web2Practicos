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

db.pokemon = require("./pokemon.js")(sequelize, Sequelize);
db.tipo = require("./tipo.js")(sequelize, Sequelize);
db.habilidad = require("./habilidad.js")(sequelize, Sequelize);

//pokemon puede tener 3 habilidades pero una es obligatoria
db.habilidad.hasMany(db.pokemon, {foreignKey: 'idHabilidad1'});
db.pokemon.belongsTo(db.habilidad, {foreignKey: 'idHabilidad1'});

db.habilidad.hasMany(db.pokemon, {foreignKey: 'idHabilidad2'});
db.pokemon.belongsTo(db.habilidad, {foreignKey: 'idHabilidad2'});

db.habilidad.hasMany(db.pokemon, {foreignKey: 'idHabilidad3'});
db.pokemon.belongsTo(db.habilidad, {foreignKey: 'idHabilidad3'});

//pokemon puede tener un tipo
db.tipo.hasMany(db.pokemon, {foreignKey: 'idTipo1'});
db.pokemon.belongsTo(db.tipo, {foreignKey: 'idTipo1'});

db.tipo.hasMany(db.pokemon, {foreignKey: 'idTipo2'});
db.pokemon.belongsTo(db.tipo, {foreignKey: 'idTipo2'});

//pokemo puede tener una evolucion previa y una siguiente
db.pokemon.hasMany(db.pokemon, {foreignKey: 'idEvPrevia'});
db.pokemon.belongsTo(db.pokemon, {foreignKey: 'idEvPrevia'});

db.pokemon.hasMany(db.pokemon, {foreignKey: 'idEvSiguiente'});
db.pokemon.belongsTo(db.pokemon, {foreignKey: 'idEvSiguiente'});

module.exports = db;