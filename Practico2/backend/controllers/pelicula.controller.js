const db = require("../models");    
const { isRequestValid } = require("../utils/request.utils");
const { uploadImage } = require("../utils/imagen.utils");

exports.listPelicula = async (req, res) => {
    try{
        const peliculas = await db.peliculas.findAll({
            include: ['repartos', 'director']
    });
        res.json(peliculas);
    } catch (error) {
        sendError500(error);
    }     
}

exports.getPeliculaById = async (req, res) => {
    try{
        const pelicula = await db.peliculas.findByPk(req.params.id, {
            include: ['repartos', 'director']
        });
        if(!pelicula){
            res.status(404).json({
                msg: 'Pelicula no encontrada'
            });
            return;
        }
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}

exports.createPelicula = async (req, res) => {
    console.log(req.body);
    const requiredFields = ['nombre', 'sinopsis','fechaLanzamiento','calificacion', 'trailer', 'director_id','repartos'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado la imagen'
            });
            return;
        }
    //se agrega foto y se guarda la ruta
    const pathImage = uploadImage(req.files.imagen, req.body.nombre, 'pelicula');
    
    
    
    try{
        console.log(req.body);
        const pelicula = {
            nombre: req.body.nombre,
            sinopsis: req.body.sinopsis,
            fechaLanzamiento: req.body.fechaLanzamiento,
            calificacion: req.body.calificacion,
            trailer: req.body.trailer,
            imagen: pathImage,
            director_id: req.body.director_id
        };
        const peliculaCreada = await db.peliculas.create(pelicula);

        let repartosArray = [];
        if (req.body.repartos) {
            repartosArray = req.body.repartos.split(',').map(id => id.trim());
        }
        
        if (Array.isArray(repartosArray) && repartosArray.length > 0) {
            console.log('------------------------------------------------------- se entro-----------------------------');
            await peliculaCreada.setRepartos(repartosArray);
        }
        res.status(201).json(peliculaCreada);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePeliculaPut = async (req, res) => {
    const requiredFields = ['nombre', 'sinopsis','fechaLanzamiento','calificacion', 'trailer','director_id'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    
    try{
        const pelicula = await db.peliculas.findByPk(req.params.id);

        if(!pelicula){
            res.status(404).json({
                msg: 'Pelicula no encontrada'
            });
            return;
        }
        if (req.files) {
            const image = req.files.foto;
            if(image){
                const pathImage = uploadImage(image, req.body.nombre, 'pelicula');
                pelicula.imagen = pathImage;
            }
        }
        pelicula.nombre = req.body.nombre;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.fechaLanzamiento = req.body.fechaLanzamiento;
        pelicula.calificacion = req.body.calificacion;
        pelicula.trailer = req.body.trailer;
        pelicula.director_id = req.body.director_id;

        //Borramos repartos y añadimos los nuevos
        const existingRepartos = await pelicula.getRepartos();
        await pelicula.removeRepartos(existingRepartos);

        //Añadimos los nuevos repartos
        let repartosArray = [];
        if (req.body.repartos) {
            repartosArray = req.body.repartos.split(',').map(id => id.trim());
        }

        if (Array.isArray(repartosArray) && repartosArray.length > 0) {
            await pelicula.setRepartos(repartosArray);
        }
        
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}


exports.deletePelicula = async (req, res) => {
    try{
        const pelicula = await db.peliculas.findByPk(req.params.id);
        if(!pelicula){
            res.status(404).json({
                msg: 'Pelicula no encontrada'
            });
            return;
        }
        pelicula.destroy();
        res.json(pelicula);
    } catch (error) {
        sendError500(error);
    }
}

function sendError500(error){
    console.log(error);
    res.status(500).json({
        msg: 'Error en el servidor'
    });
}

