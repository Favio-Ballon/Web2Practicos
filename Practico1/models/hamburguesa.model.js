module.exports = (sequelize, Sequelize) => {
    const Hamburguesa = sequelize.define("hamburguesa", {
        nombre: {
            type: Sequelize.STRING,
        },
        precio: {
            type: Sequelize.INTEGER,
        },
        descripcion: {
            type: Sequelize.STRING,
        },
        imagen: {
            type: Sequelize.STRING,
        },
    });
    return Hamburguesa;
}