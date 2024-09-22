const db = require("../models");    
const { isRequestValid } = require("../utils/request.utils");

exports.listReparto = (req, res) => {
    try{
        const repartos = db.repartos.findAll();
        res.json(repartos);
    } catch (error) {
        sendError500(error);
    }     
}

exports.createReparto = (req, res) => {
    const requiredFields = ['nombre', 'foto'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
    //agregamos foto y guardamos la ruta
    const image = req.files.photo;

    const path = __dirname + '/../public/images/reparto/' + req.body.nombre + '.jpg';

    const pathImage = '/images/reparto/' + req.body.nombre + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Error al subir la imagen'
            });
            return;
        }
    });
    
    try{
        const reparto = {
            nombre: req.body.nombre,
            foto: pathImage
        };
        const repartoCreado = db.repartos.create(reparto);
        
        res.status(201).json(repartoCreado);
    } catch (error) {
        sendError500(error);
    }
}

exports.getRepartoById = (req, res) => {
    try{
        const reparto = db.repartos.findByPk(req.params.id);
        if(!reparto){
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

exports.updateRepartoPut = (req, res) => {
    const requiredFields = ['nombre', 'foto'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    //actualizamos foto y guardamos la ruta
    const image = req.files.photo;

    const path = __dirname + '/../public/images/reparto/' + req.body.nombre + '.jpg';

    const pathImage = '/images/reparto/' + req.body.nombre + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Error al subir la imagen'
            });
            return;
        }
    });

    try{
        const reparto = db.repartos.findByPk(req.params.id);
        if(!reparto){
            res.status(404).json({
                msg: 'Reparto no encontrado'
            });
            return;
        }
        reparto.nombre = req.body.nombre;
        reparto.foto = pathImage;
        reparto.save();
        res.json(reparto);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateRepartoPatch = (req, res) => {
    
    try{
        const reparto = db.repartos.findByPk(req.params.id);
        if(!reparto){
            res.status(404).json({
                msg: 'Reparto no encontrado'
            });
            return;
        }
        reparto.nombre = req.body.nombre;
        reparto.foto = req.body.foto;
        reparto.save();
        res.json(reparto);
    } catch (error) {
        sendError500(error);
    }
}

