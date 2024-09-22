module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        imagen: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaLanzamiento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calificacion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Pelicula;
}