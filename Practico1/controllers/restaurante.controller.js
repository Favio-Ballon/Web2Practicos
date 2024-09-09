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

exports.listRestauranteUsuario = async (req, res) => {
    try {
        const usuario = req.session.usuario
        db.restaurante.findAll().then((restaurantes) => {
            res.render("restaurantes/list.ejs", { restaurantes: restaurantes, usuario: usuario });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener los restaurantes.",
        });
    }
};

exports.createRestaurante = async (req, res) => {
    res.render("restaurantes/form.ejs", { restaurante: null, errors: null });
}

exports.insertRestaurante = async (req, res) => {

    const validacion = this.validateRestauranteForm(req);

    if (validacion.errors) {
        res.render('restaurantes/form.ejs', { restaurante: validacion.restaurante, errors: validacion.errors });
        return;
    }

    if (!req.files?.photo) {
        return res.status(400).send({
            message: "Debe seleccionar una imagen",
        });
    }

    console.log(req.body);
    const image = req.files.photo;
        // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/restaurantes/' + req.body.nombre + '.jpg';

    const pathImage = '/images/restaurantes/' + req.body.nombre + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });

    try {
        db.restaurante.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            imagen: pathImage
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

        res.render("restaurantes/form.ejs", { restaurante: restaurante, errors: null });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al editar el restaurante.",
        });
    }
}

exports.updateRestaurante = async (req, res) => {

    try {

        const validacion = this.validateRestauranteForm(req);

        if (validacion.errors) {
            res.render('restaurantes/form.ejs', { restaurante: validacion.restaurante, errors: validacion.errors });
            return;
        }

        const id = req.params.id;
        const restaurante = await db.restaurante.findByPk(id);

        if (!req.files?.photo) {
            //TODO
        }else{
    
        console.log(req.body);
        const image = req.files.photo;
            // eslint-disable-next-line no-undef
        const path = __dirname + '/../public/images/restaurantes/' + req.body.nombre + '.jpg';
    
        const pathImage = '/images/restaurantes/' + req.body.nombre + '.jpg';
    
        image.mv(path, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

        restaurante.imagen = pathImage;
    }

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

exports.menuRestaurante = async (req, res) => {
    const usario = req.session.usuario;
    const restauranteId = req.params.restauranteId;
    try {
        const id = req.params.id;
        db.restaurante.findByPk(restauranteId, {
            include: 'hamburguesas'
        }).then((restaurante) => {
            res.render("hamburguesas/list.ejs", { restaurante: restaurante, hamburguesas: restaurante.hamburguesas, restauranteId: id, usuario: usario });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al obtener el menu.",
        });
    }
}

exports.validateRestauranteForm = function (req) {
    if (!req.body.nombre || !req.body.direccion || !req.body.telefono) {
        const errors = {
            nombre: !req.body.nombre,
            direccion: !req.body.direccion,
            telefono: !req.body.telefono
        };
        errors.message = 'Todos los campos son obligatorios';
        const restaurante = {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        };
        return { errors, restaurante };
    }
    return { errors: null, restaurante: null };
}