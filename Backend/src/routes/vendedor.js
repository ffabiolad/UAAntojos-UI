import express from 'express';
const vendedor = express.Router();
import {obtenerPoolConsult, obtenerPoolUpdate, crearPool} from '../../sql/connection.js'

vendedor.get('/activos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarVendedoresActivos();');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

export default vendedor;