const db = require("../models");
const sha1 = require('sha1');

exports.login = async function (req, res) {
    res.render('usuarios/login.ejs', { usuario: null, errors: null });
}

exports.authenticate = async function (req, res) {
    const usuario = await db.usuario.findOne({
        where: {
            email: req.body.email,
            password: sha1(req.body.password)
        }
    });
    if (usuario) {
        req.session.usuario = usuario;
        res.redirect('/');
    } else {
        res.render('usuarios/login.ejs', { errors: { message: 'Usuario o contraseña incorrectos' } });
    }
}

exports.logout = async function (req, res) {
    req.session.usuario = null;
    res.redirect('/login');
}

exports.createUsuario = async function (req, res) {
    res.render('usuarios/form.ejs', { usuario: null, errors: null });
}

exports.insertUsuario = async function (req, res) {
    const { errors, usuario } = validateUsuarioForm(req);
    if (errors) {
        res.render('usuarios/form.ejs', { usuario: usuario, errors: errors });
        return;
    }
    db.usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: sha1(req.body.password),
    }).then(() => {
        res.redirect('/login');
    });
}

const validateUsuarioForm = function (req) {
    if (!req.body.email || !req.body.password) {
        const errors = {
            nombre: !req.body.nombre,
            email: !req.body.email,
            password: !req.body.password
        };
        errors.message = 'Todos los campos son obligatorios';
        const usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        };
        return { errors, usuario };
    }
    return { errors: null, usuario: null };
}

exports.createReview = async function (req, res) {
    const usuario = req.session.usuario;
    const hamburguesaId = req.params.id; 
    res.render("usuarios/review.ejs", { review: null, usuario: usuario, hamburguesaId: hamburguesaId });
}

exports.insertReview = async function (req, res) {
    try {
        const puntuacion = parseInt(req.body.puntuacion);
        const id = req.params.id;
        const usuario = req.session.usuario;
        
        db.review.create({
            hamburguesaId: id,
            usuarioId: usuario.id,
            puntuacion: puntuacion,
            comentario: req.body.comentario
        }).then(() => {
            console.log('Review creada');
            res.redirect(`/hamburguesa/${id}`);
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error al crear la review.",
        });
    }
}