module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imagen: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fechaLanzamiento: {
            type: Sequelize.DATE,
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