exports.getImagePokemon = (req, res) => {
    const imageName = params.name;
    res.sendFile(path.join(__dirname, '../public/images/pokemon/', imageName));
}
    