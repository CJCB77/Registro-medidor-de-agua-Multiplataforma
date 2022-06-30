//Get db connection
const db = require('../database/connection');


const getRegistros = async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM registro");
        res.json(result.rows);
    }catch(err){
        console.log(err);
    }
};

const getRegistroById = async (req, res) => {
    const {id} = req.params;
    try{
        const result = await db.query("SELECT * FROM registro WHERE id = $1", [id]);
        res.json(result.rows[0]);
    }
    catch(err){
        console.log(err);
    }
}

const createRegistro = async (req, res) => {
    console.log(req.file.path)
    let imagen = req.file.path;
    const {id_usuario, codigo_vivienda,gps} = req.body;
    imagen = req.file.path;
    try{
        const result = await db.query(`INSERT INTO registro 
            (id_usuario, codigo_vivienda, imagen, gps) 
            VALUES ($1, $2, $3, $4) Returning * `, 
            [id_usuario, codigo_vivienda, imagen, gps]);
        res.json({"Message": "Registro Creado", "Registro": result.rows[0]});
    }
    catch(err){
        console.log(err);
    }
}

const updateRegistro = async (req, res) => {
    const {id} = req.params;
    const {id_usuario,imagen,lectura,gps,codigo_vivienda} = req.body;
    try{
        const result = await db.query(`UPDATE registro 
            SET id_usuario = $1, imagen = $2, lectura = $3, gps = $4, codigo_vivienda = $5
            WHERE id = $6 RETURNING *`, 
            [id_usuario,imagen, lectura, gps, codigo_vivienda, id]);
        res.json({"Message": "Registro Actualizado", "Registro": result.rows[0]});
    }catch(err){
        console.log(err);
    }
}

const deleteRegistro = async (req, res) => {
    const {id} = req.params;
    try{
        await db.query("DELETE FROM registro WHERE id = $1", [id]);
        res.status(200).json({"Message": "Registro Eliminado"});
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getRegistros,
    getRegistroById,
    createRegistro,
    updateRegistro,
    deleteRegistro
}
