const db = require("../models"); 
const { isRequestValid } = require("../utils/request.utils");
const { uploadImage } = require("../utils/imagen.utils");

exports.listPokemon = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findAll({
            include: ['tipo1', 'tipo2', 'habilidad1', 'habilidad2', 'habilidad3', 'evPrevia', 'evSiguiente'],
            order: [['nroPokedex', 'ASC']]
        });
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id, {
            include: [
                'tipo1', 
                'tipo2', 
                'habilidad1', 
                'habilidad2', 
                'habilidad3', 
                { 
                    association: 'evPrevia', 
                    include: ['evPrevia', 'evSiguiente'] 
                },
                { 
                    association: 'evSiguiente', 
                    include: ['evPrevia', 'evSiguiente'] 
                }
            ]
        });
        if(!pokemon){
            res.status(404).json({message: "Pokemon no encontrado"});
            return;
        }
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createPokemon = async (req, res) => {
    const requiredFields = ['nombre', 'nroPokedex', 'idTipo1', 'idHabilidad1', 'descripcion', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    if (!req.files) {
        res.status(400).json({
            msg: 'No se ha enviado la imagen'
        });
        return;
    }

    const pathImage = uploadImage(req.files.imagen, req.body.nombre, 'pokemon');

    try {
        const pokemon = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            idTipo1: req.body.idTipo1,
            idTipo2: req.body.idTipo2 || null,
            idHabilidad1: req.body.idHabilidad1,
            idHabilidad2: req.body.idHabilidad2 || null,
            idHabilidad3: req.body.idHabilidad3 || null,
            descripcion: req.body.descripcion,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spAttack: req.body.spAttack,
            spDefense: req.body.spDefense,
            speed: req.body.speed,
            nivelEvolucion: req.body.nivelEvolucion || null,
            idEvPrevia: req.body.idEvPrevia || null,
            idEvSiguiente: req.body.idEvSiguiente || null,
            imagen: pathImage
        }
        const pokemonCreado = await db.pokemon.create(pokemon);
        res.status(201).json(pokemon);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.updatePokemon = async (req, res) => {
    const requiredFields = ['nombre', 'nroPokedex', 'idTipo1', 'idHabilidad1', 'descripcion', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const pokemon = await db.pokemon.findByPk(req.params.id);
        if(!pokemon){
            res.status(404).json({message: "Pokemon no encontrado"});
            return;
        }

        if (req.files) {
            const image = req.files.imagen;
            if(image){
                const pathImage = uploadImage(image, req.body.nombre, 'pokemon');
                pokemon.imagen = pathImage;
            }
        }

        //update pokemon evPrevia and evSiguiente


        pokemon.nombre = req.body.nombre;
        pokemon.nroPokedex = req.body.nroPokedex;
        pokemon.idTipo1 = req.body.idTipo1;

        pokemon.idTipo2 = req.body.idTipo2 || null;
        pokemon.idHabilidad1 = req.body.idHabilidad1;

        pokemon.idHabilidad2 = req.body.idHabilidad2 || null;
        
        
        pokemon.idHabilidad3 = req.body.idHabilidad3 || null;
        
        pokemon.descripcion = req.body.descripcion;
        pokemon.hp = req.body.hp;
        pokemon.attack = req.body.attack;
        pokemon.defense = req.body.defense;
        pokemon.spAttack = req.body.spAttack;
        pokemon.spDefense = req.body.spDefense;
        pokemon.speed = req.body.speed;
        pokemon.nivelEvolucion = req.body.nivelEvolucion || null;
        pokemon.idEvPrevia = req.body.idEvPrevia || null;
        pokemon.idEvSiguiente = req.body.idEvSiguiente || null; 

        await pokemon.save();
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.deletePokemon = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id);
        if(!pokemon){
            res.status(404).json({message: "Pokemon no encontrado"});
            return;
        }
        await pokemon.destroy();
        res.status(204).json('Pokemon eliminado');
    } catch (error) {
        sendError500(res, error);
    }
}

exports.getLineaEvolutiva = async (req, res) => {
    let idPokemonActual = req.params.id;
    if(!idPokemonActual){
        res.status(400).json({message: "Falta el id del pokemon"});
        return;
    }
    //4 casos
    //caso 0: no tiene evolución
    let objPokemon = await db.pokemon.findByPk(idPokemonActual);
    if (objPokemon.idEvPrevia === null && objPokemon.idEvSiguiente === null) {
        const respuesta = [];
        respuesta.push(objPokemon);
        res.status(200).json(respuesta);
        return;
    }
    //caso 1: pokemon inicial es el actual
    if (objPokemon.idEvPrevia === null) {
        const respuesta = [];
        respuesta.push(objPokemon);
        while (objPokemon.idEvSiguiente !== null) {
            objPokemon = await db.pokemon.findByPk(objPokemon.idEvSiguiente);
            respuesta.push(objPokemon);
        }
        res.status(200).json(respuesta);
        return;
    }
    //caso 2: pokemon final es el actual
    if (objPokemon.idEvSiguiente === null) {
        const respuesta = [];
        while (objPokemon.idEvPrevia !== null) {
            respuesta.push(objPokemon);
            objPokemon = await db.pokemon.findByPk(objPokemon.idEvPrevia);
        }
        respuesta.push(objPokemon);
        respuesta.reverse();
        res.status(200).json(respuesta);
        return;
    }
    //caso 3: pokemon intermedio es el actual
    const respuesta = [];
    while (objPokemon.idEvPrevia !== null) {

        objPokemon = await db.pokemon.findByPk(objPokemon.idEvPrevia);
    }
    while (objPokemon.idEvSiguiente !== null) {
        respuesta.push(objPokemon);
        objPokemon = await db.pokemon.findByPk(objPokemon.idEvSiguiente);
    }
    respuesta.push(objPokemon);

    res.status(200).json(respuesta);
    return;
}

    

const sendError500 = (res, error) => {
    console.log(error); // Log the error
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    });
};