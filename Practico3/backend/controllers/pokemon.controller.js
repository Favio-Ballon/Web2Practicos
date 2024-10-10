const db = require("../models"); 

exports.listPokemon = async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({
            include: ['idTipo1', 'idTipo2', 'idHabilidad1', 'idHabilidad2', 'idHabilidad3', 'idEvPrevia', 'idEvSiguiente']
        });
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id, {
            include: ['idTipo1', 'idTipo2', 'idHabilidad1', 'idHabilidad2', 'idHabilidad3', 'idEvPrevia', 'idEvSiguiente']
        });
        if(!pokemon){
            res.status(404).json({message: "Pokemon no encontrado"});
            return;
        }
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.createPokemon = async (req, res) => {
    const requiredFields = ['nombre', 'nroPokedex', 'idTipo1', 'idHabilidad1', 'descripcion', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed', 'imagen'];
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
            idTipo2: req.body.idTipo2,
            idHabilidad1: req.body.idHabilidad1,
            idHabilidad2: req.body.idHabilidad2,
            idHabilidad3: req.body.idHabilidad3,
            descripcion: req.body.descripcion,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spAttack: req.body.spAttack,
            spDefense: req.body.spDefense,
            speed: req.body.speed,
            nivelEvolucion: req.body.nivelEvolucion,
            idEvPrevia: req.body.idEvPrevia,
            idEvSiguiente: req.body.idEvSiguiente,
            imagen: pathImage
        }
        const pokemonCreado = await db.pokemon.create(pokemon);
        res.status(201).json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePokemon = async (req, res) => {
    const requiredFields = ['nombre', 'nroPokedex', 'idTipo1', 'idHabilidad1', 'descripcion', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed', 'imagen'];
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

        pokemon.nombre = req.body.nombre;
        pokemon.nroPokedex = req.body.nroPokedex;
        pokemon.idTipo1 = req.body.idTipo1;
        pokemon.idTipo2 = req.body.idTipo2;
        pokemon.idHabilidad1 = req.body.idHabilidad1;
        pokemon.idHabilidad2 = req.body.idHabilidad2;
        pokemon.idHabilidad3 = req.body.idHabilidad3;
        pokemon.descripcion = req.body.descripcion;
        pokemon.hp = req.body.hp;
        pokemon.attack = req.body.attack;
        pokemon.defense = req.body.defense;
        pokemon.spAttack = req.body.spAttack;
        pokemon.spDefense = req.body.spDefense;
        pokemon.speed = req.body.speed;
        pokemon.nivelEvolucion = req.body.nivelEvolucion;
        pokemon.idEvPrevia = req.body.idEvPrevia;
        pokemon.idEvSiguiente = req.body.idEvSiguiente; 

        await pokemon.update(req.body);
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(error);
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
        res.status(204).json();
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