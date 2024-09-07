module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("restaurante", {
        nombre: {
            type: Sequelize.STRING,
        },
        direccion: {
            type: Sequelize.STRING,
        },
        telefono: {
            type: Sequelize.STRING,
        },
        imagen: {
            type: Sequelize.STRING
        },
    });
    return Restaurante;
}