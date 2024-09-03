const db = require("../models");

exports.listRestaurante = async (req, res) => {
    try {
        db.restaurante.findAll().then((restaurantes) => {
            res.render("restaurantes/listAdmin.ejs", { restaurantes: restaurantes });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener los restaurantes.",
        });
    }
};

exports.createRestaurante = async (req, res) => {
    res.render("restaurantes/form.ejs", { restaurante: null });
}

exports.insertRestaurante = async (req, res) => {
    try {
        db.restaurante.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }).then(() => {
            res.redirect("/restaurantes");
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al crear el restaurante.",
        });
    }
}


exports.editRestaurante = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurante = await db.restaurante.findByPk(id);

        res.render("restaurantes/form.ejs", { restaurante: restaurante });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar el restaurante.",
        });
    }
}

exports.updateRestaurante = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurante = await db.restaurante.findByPk(id);

        restaurante.nombre = req.body.nombre;
        restaurante.direccion = req.body.direccion; 
        restaurante.telefono = req.body.telefono;

        console.log(restaurante)

        await restaurante.save();

        res.redirect("/restaurantes");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al actualizar el restaurante.",
        });
    }
}

exports.deleteRestaurante = async function (req, res) {
    try {
        const id = req.params.id
        const restaurante = await db.restaurante.findByPk(id);
        await restaurante.destroy();

        res.redirect('/restaurantes');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al eliminar el restaurante.",
        });
    }
}