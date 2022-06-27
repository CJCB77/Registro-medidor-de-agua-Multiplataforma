//Get db connection
const db = require('../database/connection');

const getRegistros = async (req, res) => {
    res.json({"Registros": "Registros"})
};

const getRegistroById = async (req, res) => {
    res.json({"Registro": "Registro 1"})
}

const createRegistro = async (req, res) => {
    res.json({"Message": "Registro Creado"})
}

const updateRegistro = async (req, res) => {
    res.json({"Message": "Registro Actualizado"})
}

const deleteRegistro = async (req, res) => {
    res.json({"Message": "Registro Eliminado"})
}

module.exports = {
    getRegistros,
    getRegistroById,
    createRegistro,
    updateRegistro,
    deleteRegistro
}
