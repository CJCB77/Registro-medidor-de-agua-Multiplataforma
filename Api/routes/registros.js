const Router = require('express').Router;
const router = Router();
const registrosController = require('../controller/registrosController');

router.route('/registros').get(registrosController.getRegistros)
                            .post(registrosController.createRegistro);
                            
router.route('/registros/:id').get(registrosController.getRegistroById)
                                .put(registrosController.updateRegistro)
                                .delete(registrosController.deleteRegistro);
                                

module.exports = router;