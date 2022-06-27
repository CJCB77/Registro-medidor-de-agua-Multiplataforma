const express = require('express');
const db = require('./database/connection');
const registrosRoutes = require('./routes/registros');

const app = express();

app.use(express.json());
app.use('/api', registrosRoutes);

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