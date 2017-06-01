'use strict'

const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config.js')


mongoose.connect(config.db, (err, rep) => {
    if (err) {
        return console.log(`Error al conectar con la base de datos: ${ err }`)
    }
    console.log('Conexión a la base de datos establecida...')
    
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${ config.port }`)
    })
})
