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

// pokemon puede tener 3 habilidades pero una es obligatoria
db.habilidad.hasMany(db.pokemon, {
    as: "habilidad1",
    foreignKey: 'idHabilidad1',

});
db.pokemon.belongsTo(db.habilidad, {
    as: "habilidad1",
    foreignKey: 'idHabilidad1'
});

db.habilidad.hasMany(db.pokemon, {
    as: "habilidad2",
    foreignKey: 'idHabilidad2',
    onDelete: 'SET NULL'
});
db.pokemon.belongsTo(db.habilidad, {
    as: "habilidad2",
    foreignKey: 'idHabilidad2',
    onDelete: 'SET NULL'
});

db.habilidad.hasMany(db.pokemon, {
    as: "habilidad3",
    foreignKey: 'idHabilidad3',
    onDelete: 'SET NULL'
});
db.pokemon.belongsTo(db.habilidad, {
    as: "habilidad3",
    foreignKey: 'idHabilidad3',
    onDelete: 'SET NULL'
});

// pokemon puede tener 2 tipos pero uno es obligatorio
db.tipo.hasMany(db.pokemon, {
    as: "tipo1",
    foreignKey: 'idTipo1'
});
db.pokemon.belongsTo(db.tipo, {
    as: "tipo1",    
    foreignKey: 'idTipo1'
});

db.tipo.hasMany(db.pokemon, {
    as: "tipo2",
    foreignKey: 'idTipo2'
});
db.pokemon.belongsTo(db.tipo, {
    as: "tipo2",
    foreignKey: 'idTipo2'
});

// Ensure unique aliases for evPrevia and evSiguiente
db.pokemon.belongsTo(db.pokemon, {
    as: "evPrevia",
    foreignKey: 'idEvPrevia'
});
db.pokemon.belongsTo(db.pokemon, {
    as: "evSiguiente",
    foreignKey: 'idEvSiguiente'
});

module.exports = db;