module.exports = app => {
    require('./restaurantes.routes')(app);
    require('./hamburguesas.routes')(app);
    require('./reviews.routes')(app);
    require('./home.routes')(app);
}