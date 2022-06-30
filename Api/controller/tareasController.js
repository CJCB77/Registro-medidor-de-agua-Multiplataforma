//Conexion con la base de datos
const db = require('../database/connection');

const getTareas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tareas');
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
}

const createTarea = async (req, res) => {
    const {id_usuario,titulo,descripcion} = req.body;
    try {
        const query = `INSERT INTO tareas (id_usuario, titulo, descripcion) 
            VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(query, [id_usuario,titulo,descripcion]);
        res.status(200).json({"Message":"Tarea agregada","tarea":result.rows[0]});
        

    } catch (err) {
        console.log(err);
    }
}

const getTareaById = async (req, res) => {
    const {id} = req.params;
    try {
       const result = await db.query('SELECT * FROM tareas WHERE id = $1', [id]);
       res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
    }
}

const updateTarea = async (req, res) => {
    const {id} = req.params;
    const {titulo,descripcion} = req.body;
    try {
        const query = `UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *`;
        const result = await db.query(query, [titulo,descripcion,id]);
        res.status(200).json({"Message":"Tarea actualizada","tarea":result.rows[0]});
    } catch (err) {
        console.log(err);
    }
}

const deleteTarea = async (req, res) => {
    const {id} = req.params;
    try {
        const query = `DELETE FROM tareas WHERE id = $1`;
        await db.query(query, [id]);
        res.status(200).json({"Message":"Tarea eliminada"});
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    getTareas,
    createTarea,
    getTareaById,
    updateTarea,
    deleteTarea
}
