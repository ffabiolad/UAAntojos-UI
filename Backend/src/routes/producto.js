import express from 'express';
const producto = express.Router();
import {obtenerPoolConsult, obtenerPoolUpdate, crearPool} from '../../sql/connection.js'

producto.get('/activos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarProductosActivos()');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

producto.get('/categorias', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarCategoriasActivas()');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

producto.get('/categoria/:idCategoria', async(req, res) => {
    try{
        if(!req.params.idCategoria) throw new Error("No se ha enviado la categía que se quiere consultar")
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarProductoCategoria(?)', [req.params.idCategoria]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

export default producto;