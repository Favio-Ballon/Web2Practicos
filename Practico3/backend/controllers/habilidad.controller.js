const db = require("../models"); 
const { isRequestValid } = require("../utils/request.utils");

exports.listHabilidad = async (req, res) => {
    try {
        const habilidades = await db.habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getHabilidadById = async (req, res) => {
    try {
        const habilidad = await db.habilidad.findByPk(req.params.id);
        if(!habilidad){
            res.status(404).json({message: "Habilidad no encontrada"});
            return;
        }
        res.status(200).json(habilidad);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createHabilidad = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const habilidad = {
            nombre: req.body.nombre
        }
        const habilidadCreada = await db.habilidad.create(habilidad);
        res.status(201).json(habilidadCreada);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updateHabilidad = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const habilidad = await db.habilidad.findByPk(req.params.id);

        if(!habilidad){
            res.status(404).json({message: "Habilidad no encontrada"});
            return;
        }
        
        habilidad.nombre = req.body.nombre
        
        await habilidad.save();
        res.status(200).json(habilidad);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deleteHabilidad = async (req, res) => {
    try {
        const habilidad = await db.habilidad.findByPk(req.params.id);
        if(!habilidad){
            res.status(404).json({message: "Habilidad no encontrada"});
            return;
        }
        await habilidad.destroy();
        res.status(200).json('Habilidad eliminada');
    } catch (error) {
        sendError500(res, error);
    }
}

const sendError500 = (res, error) => {
    console.log(error); // Log the error
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    });
};