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
        db.restaurante.findAll().then((restaurantes) => {
            res.render("restaurantes/list.ejs", { restaurantes: restaurantes });
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

    if (!req.files?.photo) {
        //TODO
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