const express = require('express');
const db = require('./database/connection');

//Rutas
const registrosRoutes = require('./routes/registros');
const tareasRoutes = require('./routes/tareas');

const app = express();

app.use(express.json());
app.use('/uploads',express.static('uploads'));

//Utilizar las rutas
app.use('/api/registros', registrosRoutes);
app.use('/api/tareas', tareasRoutes);

require("dotenv").config();

app.get("/",(req, res) => {
    res.status(200).json({"Message":"Bienvenido a la api de InterAgua"});
})

const startApp = async () => {
    try{
        await db.connect()
            .then(() => console.log("Database connected"))
            .then(() => app.listen(process.env.PORT, 
                () => console.log(`Server running on port ${process.env.PORT}`)))
            .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

startApp();