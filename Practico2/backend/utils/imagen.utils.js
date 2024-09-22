module.exports = {
    uploadImage: (image, nombre) => {
        const path = __dirname + '/../public/images/reparto/' + nombre + '.jpg';
        const pathImage = '/images/reparto/' + nombre + '.jpg';

        image.mv(path, function (err) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    msg: 'Error al subir la imagen'
                });
                return;
            }
        });

        return pathImage;
    }
}
