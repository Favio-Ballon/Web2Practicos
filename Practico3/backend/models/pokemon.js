module.exports = (sequelize, Sequelize) =>{
    const Pokemon = sequelize.define('pokemon', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nroPokedex:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idTipo1: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idTipo2: Sequelize.INTEGER,
        idHabilidad1: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idHabilidad2: Sequelize.INTEGER,
        idHabilidad3: Sequelize.INTEGER,
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hp: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        attack: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        defense: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spAttack: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spDefense: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        speed: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nivelEvolucion: Sequelize.INTEGER,
        idEvPrevia: Sequelize.INTEGER,
        idEvSiguiente: Sequelize.INTEGER,
        imagen: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Pokemon;
}