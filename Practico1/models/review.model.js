module.export = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        comentario: {
            type: Sequelize.STRING,
        },
        puntuacion: {
            type: Sequelize.INTEGER,
        },
    });
    return Review;
}