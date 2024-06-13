import express from 'express';
const pedido = express.Router();
import {obtenerPoolConsult, obtenerPoolUpdate, crearPool} from '../../sql/connection.js'

pedido.get('/metodopago', async(req, res) => {
    try{
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarMetodoPago;');
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

pedido.get('/cliente/:idCliente', async(req, res) => {
    try{
        if(!req.params.idCliente) throw new Error("No se ha enviado el id del cliente");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarPedidoCliente(?);', [req.params.idCliente]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

pedido.get('/comercio/:idComercio', async(req, res) => {
    try{
        if(!req.params.idComercio) throw new Error("No se ha enviado el id del comercio");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarPedidoComercio(?);', [req.params.idComercio]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

pedido.get('/detalle/:idPedido', async(req, res) => {
    try{
        if(!req.params.idPedido) throw new Error("No se ha enviado el id del pedido");
        const pool = await obtenerPoolConsult();
        const result = await pool.query('CALL api_spGet_consultarDetallePedido(?);', [req.params.idPedido]);
        res.send({success: true, data:result[0][0]});
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

pedido.post('/crear', async(req, res) => {
    
    try{
        if(!req.body.IdCliente) throw new Error("No se ha enviado el id del cliente");
        if(!req.body.IdComercio) throw new Error("No se ha enviado el id del comercio");
        if(!req.body.IdMetodoPago) throw new Error("No se ha enviado el id del metodo de pago");
        if(!req.body.Latitud) throw new Error("No se ha enviado la latitud");
        if(!req.body.Longitud) throw new Error("No se ha enviado la longitud");
        if(!req.body.Token) throw new Error("No se ha enviado el token");
        const pool = await obtenerPoolUpdate();
        const result = await pool.query('CALL api_spPost_registrarPedido(?,?,?,?,?,?)',
            [req.body.IdCliente,req.body.IdComercio,req.body.IdMetodoPago,req.body.Latitud,req.body.Longitud,req.body.Token]);
        if(!isNaN(parseInt(result[0][0][0].response))){
            res.send({success: true, data:"Se ha creado el pedido: " + result[0][0][0].response});
        }else{
            throw new Error("Hubo un error al crear el pedido");
        }
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

pedido.post('/crear/detalles', async(req, res) => {
    
    try{
        if(!req.body.IdPedido) throw new Error("No se ha enviado el id del cliente");
        if(!req.body.IdProducto) throw new Error("No se ha enviado el id del comercio");
        if(!req.body.Cantidad) throw new Error("No se ha enviado el id del metodo de pago");
        const pool = await obtenerPoolUpdate();
        const result = await pool.query('CALL api_spPost_registrarDetallePedido(?,?,?)',
            [req.body.IdPedido,req.body.IdProducto,req.body.Cantidad]);
        if(!isNaN(parseInt(result[0][0][0].response))){
            res.send({success: true, data:"Se ha creado el detalle de pedido: " + result[0][0][0].response});
        }else{
            throw new Error("Hubo un error al crear el detalle de pedido");
        }
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

export default pedido;