import express from 'express';
const campus = express.Router();
import {obtenerPoolConsult, obtenerPoolUpdate, crearPool} from '../../sql/connection.js'

campus.get('/activos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarCampusActivos()');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

campus.get('/inactivos', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarCampusInactivos()');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

campus.post('/eliminar', async(req, res) => {
    console.log(req.body)
    try{
        if(!req.body.id) throw new Error("No se ha enviar el id por los parametros");
        const pool = await obtenerPoolUpdate();
        const result = await pool.query('CALL api_spDelete_eliminarCampus(?)',[req.body.id]);
        console.log(result[0][0][0]);
        if(result[0][0][0].response == "SUCCESS"){
            res.send({success: true, data:"Se ha eliminado el campus"});
        }else{
            throw new Error("Hubo un error al eliminar el campus");
        }
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

campus.post('/recuperar', async(req, res) => {
    
    try{
        if(!req.body.id) throw new Error("No se ha enviar el id por los parametros");
        const pool = await obtenerPoolUpdate();
        const result = await pool.query('CALL api_spUpdate_recuperarCampus(?)',[req.body.id]);
        console.log(result[0][0][0]);
        if(result[0][0][0].response == "SUCCESS"){
            res.send({success: true, data:"Se ha recuperado el campus"});
        }else{
            throw new Error("Hubo un error al recuperar el campus");
        }
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

export default campus;