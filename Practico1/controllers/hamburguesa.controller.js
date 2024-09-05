const db = require("../models");

exports.listHamburguesas = async (req, res) => {
    try {
        const restauranteId = req.params.restauranteId;
        console.log(req.params);
        //get hamburguesas by id 
        db.hamburguesa.findAll({
            where: {
                restauranteId: restauranteId
            }
        }).then((hamburguesas) => {
            res.render("hamburguesas/listAdmin.ejs", { hamburguesas: hamburguesas, restauranteId: restauranteId });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener las hamburguesas.",
        });
    }
};

exports.createHamburguesa = async (req, res) => {
    const restauranteId = req.params.restauranteId;
    res.render("hamburguesas/form.ejs", { hamburguesa: null, restauranteId: restauranteId });
}

exports.insertHamburguesa = async (req, res) => {
    const restauranteId = req.params.restauranteId;
    console.log(restauranteId);
    try {
        db.hamburguesa.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            restauranteId: restauranteId
        }).then(() => {
            res.redirect("/restaurantes/" + restauranteId + "/menu");
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al crear la hamburguesa.",
        });
    }
}

exports.editHamburguesa = async (req, res) => {
    try {
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);

        res.render("hamburguesas/form.ejs", { hamburguesa: hamburguesa });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar la hamburguesa.",
        });
    }
}
exports.updateHamburguesa = async (req, res) => {
    try {
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);

        hamburguesa.nombre = req.body.nombre;
        hamburguesa.precio = req.body.precio;
        hamburguesa.descripcion = req.body.descripcion;
        hamburguesa.imagen = req.body.imagen;

        await hamburguesa.save();
        res.redirect("/restaurantes/" + hamburguesa.restauranteId + "/menu");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar la hamburguesa.",
        });
    }
}

exports.deleteHamburguesa = async function (req, res) {
    try {
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);
        await hamburguesa.destroy();
        res.redirect("/restaurantes/" + hamburguesa.restauranteId + "/menu");
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al eliminar la hamburguesa.",
        });
    }
};

exports.uploadPhotoGet = async (req, res) => {
    try {
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);
        res.render("hamburguesas/uploadPhoto.ejs", { hamburguesa: hamburguesa, errors: null });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al subir la foto.",
        });
    }
}

exports.uploadPhotoPost = async (req, res) => {
    try {
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);
        if (!req.files?.photo) {
            res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, hamburguesa });
            return;
        }
        const image = req.files.photo;
        // eslint-disable-next-line no-undef
        const path = __dirname + '/../public/images/profile/' + persona.id + '.jpg';

        image.mv(path, function (err) {
            if (err) {
                res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, hamburguesa });
                console.log(err);
                return;
            }
            res.redirect('/hamburguesas');
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al subir la foto.",
        });
    }
}
    

