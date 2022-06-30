const db = require('../database/connection');
const userSchema = require('../validation/userSchema');
const bcript = require('bcrypt');


const login = async (req, res) => {
    const {username,password} = req.body;
    try{
        const query = `SELECT * FROM usuario WHERE username = $1 AND password = $2`;
        const result = await db.query(query, [username,password]);
        res.json({"Message":"Usuario autenticado","usuario":result.rows[0]});
    } catch(err){
        console.log(err);
    }
}

const register = async (req, res) => {
    const {username,password,role} = req.body;

    //Validar los datos antes de ingresarlos
    const {error} = userSchema.validate({username,password,role});
    if(error){
        res.status(400).json({"Message":error.details[0].message});
        return;
    }
    
    //Verificar si el usuario ya existe
    const query = `SELECT * FROM usuario WHERE username = $1`;
    const result = await db.query(query, [username]);
    if(result.rows.length > 0){
        res.status(400).json({"Message":"El usuario ya existe"});
        return;
    }

    //Encriptar contraseña
    const salt = await bcript.genSalt(10);
    const hashed_password = await bcript.hash(password, salt);

    try{
        const query = `INSERT INTO usuario (username, password, role) VALUES ($1, $2, $3)`;
        await db.query(query, [username,hashed_password,role]);
        res.json({"Message":`Usuario ${username} registrado`});

    } catch(err){
        console.log(err);
    }
}

module.exports = {
    login,
    register
}
