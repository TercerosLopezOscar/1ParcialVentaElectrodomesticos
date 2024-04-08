const express = require('express');
const rutaCliente = express.Router();
const ClienteModel = require('../models/cliente');

rutaCliente.get('/', async (req, res) =>{
    try {
        const clientes = await ClienteModel.find();
        console.log(clientes);
        res.json(clientes);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
rutaCliente.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaCliente = new ClienteModel({
        
        nombre: req.body.nombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        ci: req.body.ci,
        sexo: req.body.sexo,
        prioridad: req.body.prioridad
    });
    try {
        const guardarCliente = await nuevaCliente.save();
        res.status(201).json(guardarCliente);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
rutaCliente.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarCliente = await ClienteModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarCliente);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutaCliente.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarCliente = await ClienteModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Tarea eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
rutaCliente.get('/ordenar-desc', async (req, res) =>{
    try {
        const desc = await ClienteModel.find().sort({nombre: -1});
        res.json(desc);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutaCliente.delete('/eliminar-prioridad/:prioridad', async (req, res) =>{
    try {
        console.log(req.params.prioridad);
        const prioridad = req.params.prioridad
        const eliminarUnClientePrioridad = await ClienteModel.deleteOne({prioridad});
        res.json({mensaje: 'Tareas eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
 
module.exports = rutaCliente;

