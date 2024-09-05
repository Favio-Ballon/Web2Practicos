const db = require("../models");

exports.listReviews = async (req, res) => {
    try {
        db.review.findAll({
            include:['hamburguesa','usuario']  
        }).then((reviews) => {
            res.render("reviews/listAdmin.ejs", { reviews: reviews});
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener las reviews.",
        });
    }
}

exports.createReview = async (req, res) => {
    const usuario = await db.usuario.findAll();
    const hamburguesa = await db.hamburguesa.findAll();
    res.render("reviews/form.ejs", { review: null, usuarios: usuario, hamburguesas: hamburguesa });
}

exports.insertReview = async (req, res) => {
    try {
        //calificacion a int
        req.body.puntuacion = parseInt(req.body.puntuacion);

        
        db.review.create({
            hamburguesaId: req.body.hamburguesaId,
            usuarioId: req.body.usuarioId,
            puntuacion: req.body.puntuacion,
            comentario: req.body.comentario
        }).then(() => {
            res.redirect("/reviews");
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al crear la review.",
        });
    }
}

exports.editReview = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await db.review.findByPk(id);

        res.render("reviews/form.ejs", { review: review });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar la review.",
        });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await db.review.findByPk(id);

        review.hamburguesaId = req.body.hamburguesaId;
        review.usuarioId = req.body.usuarioId;
        review.calificacion = req.body.calificacion;
        review.comentario = req.body.comentario;

        await review.save();
        res.redirect("/reviews");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar la review.",
        });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await db.review.findByPk(id);

        await review.destroy();
        res.redirect("/reviews");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al eliminar la review.",
        });
    }
}