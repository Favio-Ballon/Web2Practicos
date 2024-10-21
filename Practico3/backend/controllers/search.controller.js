const db = require("../models");

exports.getBuscador = async (req, res) => {
  const name = req.params.name;
  try {
    //if name is a number, search by nroPo
    if (!isNaN(name)) {
      const pokemons = await db.pokemon.findAll({
        where: {
          nroPokedex: name,
        },
      });
      console.log(pokemons);
      const results = [];
      pokemons.forEach((pokemon) => {
        results.push({
          id: pokemon.id,
          nombre: pokemon.nombre,
          tipo: "pokemon",
        });
      });
      console.log(results);
      res.status(200).json({ results });
      return;
    }
    const pokemons = await db.pokemon.findAll({
      where: {
        nombre: {
          [db.Sequelize.Op.like]: `%${name}%`,
        },
      },
    });
    const tipos = await db.tipo.findAll({
      where: {
        nombre: {
          [db.Sequelize.Op.like]: `%${name}%`,
        },
      },
    });

    //combine both results id and nombre
    const results = [];

    pokemons.forEach((pokemon) => {
      results.push({
        id: pokemon.id,
        nombre: pokemon.nombre,
        tipo: "pokemon",
      });
    });

    tipos.forEach((tipo) => {
      results.push({
        id: tipo.id,
        nombre: tipo.nombre,
        tipo: "tipo",
      });
    });

    console.log(results);

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getPokemonByTipo = async (req, res) => {
  const tipoId = req.params.tipo;
  try {
    const tipo = await db.tipo.findByPk(tipoId, {
      include: ["tipo1", "tipo2"],
    });
    const results = [];
    tipo.tipo1.forEach((pokemon) => {
      results.push({
        id: pokemon.id,
        nroPokedex: pokemon.nroPokedex,
        nombre: pokemon.nombre,
        imagen: pokemon.imagen,
        tipo: tipo.nombre,
      });
    });
    tipo.tipo2.forEach((pokemon) => {
      if (!results.find((p) => p.id === pokemon.id)) {
        results.push({
          id: pokemon.id,
          nroPokedex: pokemon.nroPokedex,
          nombre: pokemon.nombre,
          imagen: pokemon.imagen,
          tipo: tipo.nombre,
        });
      }
    });
    //se ordena results por nroPokedex
    results.sort((a, b) => a.nroPokedex - b.nroPokedex);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getPokemonByName = async (req, res) => {
  const name = req.params.name;
  try {
    var pokemons;
    //Si es numero se busca por nroPokedex
    if (!isNaN(name)) {
      //get all pokemons with a nrPokedex like
      pokemons = await db.pokemon.findAll({
        order: [["nroPokedex", "ASC"]],
        where: {
          nroPokedex: {
            [db.Sequelize.Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      //get all pokemons with name like
      pokemons = await db.pokemon.findAll({
        order: [["nroPokedex", "ASC"]],
        where: {
          nombre: {
            [db.Sequelize.Op.like]: `%${name}%`,
          },
        },
      });
    }
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
