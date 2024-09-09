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
    res.render("hamburguesas/form.ejs", { hamburguesa: null, restauranteId: restauranteId, errors: null });
}

exports.insertHamburguesa = async (req, res) => {

    const validacion = validateHamburguesaForm(req);

    if (validacion.errors) {
        res.render('hamburguesas/form.ejs', { hamburguesa: validacion.hamburguesa, errors: validacion.errors });
        return;
    }

    const restauranteId = req.params.restauranteId;
    console.log(restauranteId);

    if (!req.files?.photo) {
        return res.status(400).send({
            message: "Debe seleccionar una imagen",
        });
    }

    console.log(req.body);
    const image = req.files.photo;
        // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/hamburguesas/' + req.body.nombre + '.jpg';

    const pathImage = '/images/hamburguesas/' + req.body.nombre + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });

    try {
        db.hamburguesa.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: pathImage,
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

        res.render("hamburguesas/form.ejs", { hamburguesa: hamburguesa, errors: null });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar la hamburguesa.",
        });
    }
}
exports.updateHamburguesa = async (req, res) => {
    try {
        const validacion = validateHamburguesaForm(req);
        if (validacion.errors) {
            res.render('hamburguesas/form.ejs', { hamburguesa: validacion.hamburguesa, errors: validacion.errors });
            return;
        }
        const id = req.params.id;
        const hamburguesa = await db.hamburguesa.findByPk(id);

        if (!req.files?.photo) {
            //TODO
        }else{
    
        console.log(req.body);
        const image = req.files.photo;
            // eslint-disable-next-line no-undef
        const path = __dirname + '/../public/images/hamburguesas/' + req.body.nombre + '.jpg';
    
        const pathImage = '/images/hamburguesas/' + req.body.nombre + '.jpg';
    
        image.mv(path, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

        hamburguesa.imagen = pathImage;
    }

        hamburguesa.nombre = req.body.nombre;
        hamburguesa.precio = req.body.precio;
        hamburguesa.descripcion = req.body.descripcion;

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
    
exports.hamburguesaDetail = async (req, res) => {
    try {
        let isReviewed = false;
        const usuario = req.session.usuario;
        const id = req.params.id;

        if (usuario) {
            const review = await db.review.findOne({
                where: {
                    usuarioId: usuario.id,
                    hamburguesaId: id
                }
            });
            if (review) {
                isReviewed = true;
            }
        }

        db.hamburguesa.findByPk(id, {
            include: [{
                model: db.review,
                as: 'reviews',
                include: [{
                    model: db.usuario,
                    as: 'usuario'
                }]
            }]
        }).then((hamburguesa) => {
            res.render("hamburguesas/detail.ejs", { hamburguesa: hamburguesa, usuario: usuario, isReviewed: isReviewed });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener la hamburguesa.",
        });
    }
}

const validateHamburguesaForm = function (req) {
    if (!req.body.nombre || !req.body.precio || !req.body.descripcion) {
        const errors = {
            nombre: !req.body.nombre,
            precio: !req.body.precio,
            descripcion: !req.body.descripcion
        };
        errors.message = 'Todos los campos son obligatorios';
        const hamburguesa = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion
        };
        return { errors, hamburguesa };
    }
    return { errors: null, hamburguesa: null };
}