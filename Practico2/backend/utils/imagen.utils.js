module.exports = {
    uploadImage: (image, nombre, destino) => {
        const path = __dirname + '/../public/images/'+ destino +'/' + nombre + '.jpg';

        image.mv(path, function (err) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    msg: 'Error al subir la imagen'
                });
                return;
            }
        });

        return nombre + '.jpg';
    }
}
