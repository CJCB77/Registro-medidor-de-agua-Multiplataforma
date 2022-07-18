const express = require('express');
const db = require('./database/connection');
//Add cors
const cors = require('cors');

//Verify token middleware
const verifyToken = require('./validation/verifyToken');


//Rutas
const registrosRoutes = require('./routes/registros');
const tareasRoutes = require('./routes/tareas');
const viviendaRoutes = require('./routes/vivienda');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

//Utilizar las rutas
app.use('/api/registros',verifyToken, registrosRoutes);
app.use('/api/tareas',verifyToken, tareasRoutes);
app.use('/api/viviendas',verifyToken, viviendaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios',verifyToken, userRoutes);

require("dotenv").config();

app.get("/",(req, res) => {
    res.status(200).json({"Message":"Bienvenido a la api de CNEL"});
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