module.exports = (sequelize, Sequelize) => {
    const Reparto = sequelize.define("reparto", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Reparto;
}