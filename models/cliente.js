const mongoose = require('mongoose');

const ClienteEsquema = new mongoose.Schema({
    nombre : String,
    primerApellido : String,
    segundoApellido : String,
    ci:Number,
    sexo:String,
    prioridad:Number
})

const ClienteModel = mongoose.model('Cliente',ClienteEsquema,'cliente');
module.exports = ClienteModel;