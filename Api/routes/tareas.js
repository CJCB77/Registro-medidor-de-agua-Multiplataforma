const router = require('express').Router();


router.get('/', (req,res) => {
    res.json({"Message":"GET tareas"});
});

router.post('/add', (req,res) => {
    res.json({"Message":"Tarea agregada"});
});

router.get('/:id', (req,res) => {
    res.json({"Message":"GET tarea"});
});

router.put('/update/:id', (req,res) => {
    res.json({"Message":"Tarea actualizada"});
});

router.delete('/delete/:id', (req,res) => {
    res.json({"Message":"Tarea eliminada"});
});

module.exports = router;