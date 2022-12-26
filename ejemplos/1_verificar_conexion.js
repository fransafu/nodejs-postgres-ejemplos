/**
 * En el siguiente ejemplo verificaremos si el servidor
 */


// Importamos un Client desde la biblioteca de node-postgres (pg)
const { Client } = require('pg');

// Declaramos las variables utilizadas para conectarnos con la base de datos
const DATABASE_HOST = "localhost";
const DATABASE_USER = "postgres";
const DATABASE_PASSWORD = "postgres";
const DATABASE_NAME = "postgres"; // Nombre de la base de datos en el servidor
const DATABASE_PORT = "5432";

// Creamos una instancia del objeto Client (aún no estamos conectados, solo llenamos el objetos con los datos)
const cliente = new Client({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
});

// Creamos una función que intente conectarse con el servidor PostgreSQL
const verificarConexion = async () => {
    try {
        // nos conectamos al servidor
        await cliente.connect();
        // ejecutamos un SELECT simple que devuelva un "1" para ver que todo este bien
        await cliente.query('SELECT 1');
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
verificarConexion()
    .then(() => {
        console.log('La verificación de conexión con el servidor PostgreSQL fue exitoso');
    })
    .catch((error) => {
        console.error('No fue posible conectarse con el servidor: ', error);
    })
