const db = require("../models");
const { isRequestValid } = require("../utils/request.utils");
const { uploadImage } = require("../utils/imagen.utils");
//import 

exports.listReparto = async (req, res) => {
    try {
        const repartos = await db.repartos.findAll();
        if (!repartos) {
            res.status(404).json({
                msg: 'Repartos no encontrados'
            });
            return;
        }
        res.json(repartos);
    } catch (error) {
        sendError500(error);
    }
}

exports.getRepartoById = async (req, res) => {
    try {
        const reparto = await db.repartos.findByPk(req.params.id,{
            include: ['peliculas']
        });
        if (!reparto) {
            res.status(404).json({
                msg: 'Reparto no encontrado'
            });
            return;
        }
        res.json(reparto);
    } catch (error) {
        sendError500(error);
    }
}

exports.createReparto = async (req, res) => {
    console.log(req.body);
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    
    if(!req.files){
        res.status(400).json({
            msg: 'No se ha enviado la imagen'
        });
        return;
    }
    
    const image = req.files.foto;

    //si no hay foto se devuelve un error
    if (!image) {
        res.status(400).json({
            msg: 'No se ha enviado la imagen'
        });
        return;
    }

    const pathImage = uploadImage(image, req.body.nombre, 'reparto');
    

    try {
        const reparto = {
            nombre: req.body.nombre,
            foto: pathImage
        };
        const repartoCreado = await db.repartos.create(reparto);

        res.status(201).json(repartoCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateRepartoPut = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    //actualizamos foto y guardamos la ruta


    try {
        const reparto = await db.repartos.findByPk(req.params.id);

        if (req.files) {
            const image = req.files.foto;
            if(image){
                const pathImage = uploadImage(image, req.body.nombre, 'reparto');
                reparto.foto = pathImage;
            }
        }
        if (!reparto) {
            res.status(404).json({
                msg: 'Reparto no encontrado'
            });
            return;
        }
        console.log(reparto);
        reparto.nombre = req.body.nombre;
        await reparto.save();
        res.json(reparto);
    } catch (error) {
        sendError500(error);
    }
}


exports.deleteReparto = async (req, res) => {
    try {
        const reparto = await db.repartos.findByPk(req.params.id);
        if (!reparto) {
            res.status(404).json({
                msg: 'Reparto no encontrado'
            });
            return;
        }
        await reparto.destroy();
        res.json(reparto);
    } catch (error) {
        sendError500(error);
    }
}

function sendError500(error) {
    console.log(error);
    res.status(500).json({
        msg: 'Error en el servidor'
    });
}

