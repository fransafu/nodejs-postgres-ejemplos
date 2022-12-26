/**
 * En el siguiente ejemplo se creará una tabla en la base de datos PostgreSQL que ya fue creada en el ejemplo:
 *    * 2_crear_una_base_de_datos
 * Definiendo el nombre "db_tienda_del_vecindario" en la variable DATABASE_NAME
 */

// Importamos un Client desde la biblioteca de node-postgres (pg)
const { Client } = require('pg');

// Declaramos las variables utilizadas para conectarnos con la base de datos
const DATABASE_HOST = "localhost";
const DATABASE_USER = "postgres";
const DATABASE_PASSWORD = "postgres";
const DATABASE_NAME = "db_tienda_del_vecindario";
const DATABASE_PORT = "5432";

// Creamos una instancia del objeto Client (aún no estamos conectados, solo llenamos el objetos con los datos)
const cliente = new Client({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
});

// Creamos una función que gestione la creación de la tabla "productos"
const crearModeloDeDatos = async () => {
    try {
        await cliente.connect();
        await cliente.query(`
            CREATE TABLE productos(
                id SERIAL,
                nombre VARCHAR(200) NOT NULL,
                precio INT NOT NULL
            );
        `);
    } catch (error) {
        throw error;
    } finally {
        await cliente.end();
    }
};

// Utilizamos la función "crearModeloDeDatos" la cual ejecuta las consultas SQL creando las tablas
// necesarias para continuar con los ejemplos.
crearModeloDeDatos()
    .then(() => {
        console.log('El modelo de datos se ha creado exitosamente')
    })
    .catch((error) => {
        console.error('Hubo un error durante la creación del modelo de datos: ', error);
    })
