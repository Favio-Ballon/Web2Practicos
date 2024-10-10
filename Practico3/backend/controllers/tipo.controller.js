const db = require("../models"); 
const { isRequestValid } = require("../utils/request.utils");

exports.listTipo = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        res.status(200).json(tipos);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getTipoById = async (req, res) => {
    try {
        const tipo = await db.tipo.findByPk(req.params.id);
        if(!tipo){
            res.status(404).json({message: "Tipo no encontrado"});
            return;
        }
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createTipo = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const tipo = {
            nombre: req.body.nombre
        }
        const data = await db.tipo.create(tipo);
        res.status(201).json(data);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updateTipo = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const tipo = await db.tipo.findByPk(req.params.id);

        if(!tipo){
            res.status(404).json({message: "Tipo no encontrado"});
            return;
        }
        tipo.nombre = req.body.nombre;
        await tipo.save();
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deleteTipo = async (req, res) => {
    try {
        const tipo = await db.tipo.findByPk(req.params.id);
        if(!tipo){
            res.status(404).json({message: "Tipo no encontrado"});
            return;
        }
        await tipo.destroy();
        res.status(200).json(tipo);
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
