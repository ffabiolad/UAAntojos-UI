import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path: __dirname+'/../.env'});

const config1 = {
    host: process.env.HOST_DB1,
    user: process.env.USER_DB1,
    database: process.env.DATABASE_DB1,
    password: process.env.PASSWORD_DB1,
    port: process.env.PORT_DB1,
};

const config2 = {
    host: process.env.HOST_DB2,
    user: process.env.USER_DB2,
    database: process.env.DATABASE_DB2,
    password: process.env.PASSWORD_DB2,
    port: process.env.PORT_DB2,
};

let poolConsult;
let poolUpdate;

crearPool();

export async function crearPool() {
    console.log("Creando pool de conexiones a la base de datos");
    console.log(__dirname);
    console.log(config1, config2);
    try {
    poolConsult = await mysql.createPool({
            ...config1,
            connectionLimit: 20, // Ajusta según tus necesidades
            typeCast: function castField( field, useDefaultTypeCasting ) {
                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
                    var bytes = field.buffer();
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return( bytes[ 0 ] === 1 );
                }
                return( useDefaultTypeCasting() );
            }
        });
        /*let res = await poolConsult.query('CALL api_spGet_consultarCampusActivos();');
        console.log(res[0]);*/
        console.log("Pool de conexion a consultas creado correctamente");
        poolUpdate = await mysql.createPool({
            ...config2,
            connectionLimit: 20, // Ajusta según tus necesidades
            typeCast: function castField( field, useDefaultTypeCasting ) {
                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
                    var bytes = field.buffer();        
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return( bytes[ 0 ] === 1 );
        
                }
                return( useDefaultTypeCasting() );
            }
        });
        /*let res = await poolUpdate.query('CALL api_spDelete_eliminarCampus(2);');
        console.log(res[0]);*/
        console.log("Pool de conexion a inserts y update creado correctamente");
    } catch (err) {
        console.error("Error al crear pool de conexiones: ", err.message);
    }
}

export function obtenerPoolConsult() {
    if (!poolConsult) {
        throw new Error("El pool de conexiones no ha sido creado. Llama primero a crearPool()");
    }
    return poolConsult;
}

export function obtenerPoolUpdate() {
    if (!poolUpdate) {
        throw new Error("El pool de conexiones no ha sido creado. Llama primero a crearPool()");
    }
    return poolUpdate;
}
