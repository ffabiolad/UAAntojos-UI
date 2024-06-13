import express from 'express';
const routerApi = express.Router();
const router = express.Router();
import { obtenerPoolConsult, obtenerPoolUpdate } from '../../sql/connection.js';
import vendedor from './vendedor.js';
import campus from './campus.js';
import comercio from './comercio.js';
import pedido from './pedido.js';
import producto from './producto.js';

router.use('/comercio', comercio);
router.use('/campus', campus);
router.use('/vendedor', vendedor);
router.use('/pedido', pedido);
router.use('/producto', producto);

router.post('/login', async(req, res) => {
    try{
        console.log(req.body)
        const pool = await obtenerPoolUpdate();
        console.log("Hola");
        const result = await pool.query('CALL api_spGet_autenticacionUsuario(?,?,?)',[req.body.correo,req.body.contra,req.body.token]);
        console.log("Hola");
        console.log(result[0]);
        if(result[0][0][0]){
            res.send({success: true, data:result[0][0]});
        }else{
            throw new Error("Hubo un error en login");
        }
        
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

router.post('/registro', async(req, res) => {
    try{
        if(!req.body.nombres) throw new Error("No se envió el nombre del usuario");
        if(!req.body.apPaterno) throw new Error("No se envió el apellido paterno del usuario");
        if(!req.body.apMaterno) throw new Error("No se envió el apellido materno del usuario");
        if(!req.body.correo) throw new Error("No se envió el correo del usuario");
        if(!req.body.contra) throw new Error("No se envió la contraseña del usuario");
        if(!req.body.tipo) throw new Error("No se envió el tipo de usuario");
        const pool = await obtenerPoolUpdate();
        const result = await pool.query("CALL api_spPost_registrarNuevoUsuario(?, ?, ?, ?, ?, ?);",[req.body.nombres,req.body.apPaterno, req.body.apMaterno,req.body.correo,req.body.contra,req.body.tipo]);
        console.log(result);
        if(result[0][0][0].response == "SUCCESS"){
            res.send({success: true, data: "Usuario creado correctamente, ahora puede inicar sesión"});
        }else if(result[0][0][0].response == "Usuario Existente"){
            throw new Error("Ya existe un usuario con el correo proporcionado");
        }else{
            throw new Error("Ocurrio un error al intentar registrar el usuario");
        }
    }catch(err){
        res.send({success: false, data:err.message});
    }
});

routerApi.use('/api', router);
export default routerApi;