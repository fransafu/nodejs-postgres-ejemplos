/**
 * En el siguiente ejemplo se implementaran funciones para crear, actualizar, borrar y obtener productos.
 * El modelo de datos y la base de datos fueron creados en los ejemplos
 *  2_crear_una_base_de_datos.js
 *  4_crear_tablas.js
 */

// Importamos el objeto Pool desde la biblioteca de node-postgres (pg)
const { Pool } = require('pg');

// Declaramos las variables utilizadas para conectarnos con la base de datos
const DATABASE_HOST = "localhost";
const DATABASE_USER = "postgres";
const DATABASE_PASSWORD = "postgres";
const DATABASE_NAME = "db_tienda_del_vecindario";
const DATABASE_PORT = "5432";

// Creamos una instancia del objeto Pool
const pool = new Pool({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
});

const crearProducto = async ({ nombre, precio }) => {
    try {
        const consulta = "INSERT INTO productos(nombre, precio) VALUES ($1, $2)";
        const valores = [nombre, precio];
        const resultado = await pool.query(consulta, valores);
        return resultado;
    } catch (error) {
        throw error;
    }
}

const obtenerProductos = async () => {
    try {
        const consulta = "SELECT * FROM productos";
        const { rows } = await pool.query(consulta)
        return rows;
    } catch (error) {
        console.error("Hubo un error al obtener los productos ", error);
        return [];
    }
}

const actualizarProducto = async ({ id, nombre, precio }) => {
    try {
        const consulta = "UPDATE productos SET nombre = $2, precio = $3 WHERE id = $1";
        const valores = [id, nombre, precio];
        const resultado = await pool.query(consulta, valores);
        return resultado;
    } catch (error) {
        throw error;
    }
}

const borrarProducto = async (id) => {
    try {
        const consulta = "DELETE FROM productos WHERE id = $1";
        const valores = [id];
        const resultado = await pool.query(consulta, valores);
        return resultado
    } catch (error) {
        throw error;
    }
}

(async () => {
    const productos = [
        { nombre: "producto 1", precio: 1000 },
        { nombre: "producto 2", precio: 1500 },
        { nombre: "producto 3", precio: 2000 },
        { nombre: "producto 4", precio: 2500 },
    ]

    /**
     * Creamos los productos en la base de datos
     */
    try {
        const crearProductosPromesas = productos.map((producto) => crearProducto(producto));
        await Promise.all(crearProductosPromesas)
        console.log("Productos creados exitosamente!")
    } catch (error) {
        console.error("hubo un problema en el proceso de crear los productos en la base de datos ", error)
        return;
    }

    /**
     * Obtenemos los productos para revisar como quedaron en la base de datos
     */
    try {
        const listaProductos = await obtenerProductos();
        console.log("Lista de productos obtenidos: ", listaProductos)
    } catch (error) {
        console.error("Hubo un problema al obtener la lista de productos ", error);
        return;
    }

    /**
     * Actualizamos el segundo producto
     */
    try {
        const productoPorActualizar = { id: 2, nombre: "producto actualizado", precio: 0 }
        await actualizarProducto(productoPorActualizar);
        console.log("Producto actualizado exitosamente!")
    } catch (error) {
        console.error("Hubo un problema al obtener la lista de productos ", error);
        return;
    }

    /**
     * Obtenemos los productos para revisar como quedaron en la base de datos
     */
    try {
        const listaProductos = await obtenerProductos();
        console.log("Lista de productos obtenidos: ", listaProductos);
    } catch (error) {
        console.error("Hubo un problema al obtener la lista de productos ", error);
        return;
    }

    /**
     * Eliminamos el producto con el ID número 3
     */
    try {
        const resultadoBorrado = await borrarProducto(3);
        console.log("La cantidad de registros eliminados fueron: ", resultadoBorrado.rowCount)
    } catch (error) {
        console.error("Hubo un problema al obtener la lista de productos ", error);
        return;
    }

    /**
     * Obtenemos los productos para revisar como quedaron en la base de datos
     */
     try {
        const listaProductos = await obtenerProductos();
        console.log("Lista de productos obtenidos: ", listaProductos);
    } catch (error) {
        console.error("Hubo un problema al obtener la lista de productos ", error);
        return;
    }

    // Cerramos las conexiones con la base de datos
    // NOTA: es posible ser explicito e indicar que cuando finalice el programa se cierren las conexiones
    pool.end();
})();
