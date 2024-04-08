const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//configuraciones
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;
//importar rutas
const clientesRutas = require('./routes/clienteRuta');
//configurar express para JSON
app.use(express.json());
//conexxion base de datos
mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion con MONGODB exitosa');
                app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));

app.use('/ruta-cliente',clientesRutas)
