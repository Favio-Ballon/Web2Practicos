const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.use(express.static('public'));

//sesiones
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto'
}))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

const db = require("./models");

db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});



require('./routes')(app);




app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000')
})