/**
 * En el siguiente ejemplo se realizará la creación de una base de datos
 * en un servidor PostgreSQL utilizando la biblioteca de node-postgres (pg)
 */

// Importamos un Client desde la biblioteca de node-postgres (pg)
const { Client } = require('pg');

// Declaramos las variables utilizadas para conectarnos con la base de datos
const DATABASE_HOST = "localhost";
const DATABASE_USER = "postgres";
const DATABASE_PASSWORD = "postgres";
const DATABASE_PORT = "5432";

// Creamos una instancia del objeto Client (aún no estamos conectados, solo llenamos el objetos con los datos)
const cliente = new Client({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
});

// Creamos una función que gestione la creación de la base de datos
// en el servidor de PostgreSQL
const crearBaseDeDatos = async (nombreBaseDeDatos) => {
    try {
        await cliente.connect();
        await cliente.query(`CREATE DATABASE ${nombreBaseDeDatos}`);
    } catch (error) {
        throw error;
    } finally {
        await cliente.end();
    }
};

// Utilizamos la función anteriormente declarada para crear una base de datos
// e ingresamos el nombre de la base de datos. Posterior utilizamos "then" para
// cuando todo ocurre de la forma esperada y la Promesa se resuelve exitosamente
// y "catch" para manejar el error (solo si existe) generado al momento de crear la base de datos
crearBaseDeDatos("db_tienda_del_vecindario")
    .then(() => {
        console.log('Base de datos creada exitosamente')
    })
    .catch((error) => {
        console.error('Hubo un error al crear la base de datos: ', error);
    })
