exports.getImageReparto = (req, res) => {
    const imageName = params.name;
    res.sendFile(path.join(__dirname, '../public/images/reparto/', imageName));
}

exports.getImagePelicula = (req, res) => {
    const imageName = params.name;
    res.sendFile(path.join(__dirname, '../public/images/pelicula/', imageName));
}
