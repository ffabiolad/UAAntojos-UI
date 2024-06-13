import express from 'express';
const comercio = express.Router();
import {obtenerPoolConsult, obtenerPoolUpdate, crearPool} from '../../sql/connection.js'

comercio.get('/activos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarComerciosActivos();');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

comercio.get('/inactivos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarComerciosInactivos();');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

comercio.get('/edificio/:idComercio', async(req, res) => {
    try{
        if(!req.params.idComercio) throw new Error("No se ha enviado el id del comercio por la URL");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarEdificiosComercios(?);', [req.params.idComercio]);
        if(!result[0][0][0]){ res.send({success: true, data:{}}); }
        else { res.send({success: true, data:result[0][0][0]}); }
        

    }catch(err){
        res.send({success: false, data:err.message});
    }
});

comercio.get('/productos/:idComercio', async(req, res) => {
    try{
        if(!req.params.idComercio) throw new Error("No se ha enviado el id del comercio por la URL");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL  api_spGet_consultarComercioProductos(?);', [req.params.idComercio]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

comercio.get('/metodopago/:idComercio', async(req, res) => {
    try{
        if(!req.params.idComercio) throw new Error("No se ha enviado el id del comercio por la URL");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL  api_spGet_consultarComercioMetodoPago(?);', [req.params.idComercio]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

comercio.get('/vendedores/:idComercio', async(req, res) => {
    try{
        if(!req.params.idComercio) throw new Error("No se ha enviado el id del comercio por la URL");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL  api_spGet_consultarComercioVendedor(?);', [req.params.idComercio]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});



export default comercio;