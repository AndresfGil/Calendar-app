const { Router } = require('express');
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/idDate')

const router = Router();

// Todos tienen que pasar por la validacion del JWT
router.use( validarJWT )

// Event ROutes

//Obtener evento
router.get('/', getEventos );

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

//Actualizar evento
router.put('/:id', actualizarEvento );

//Borrar evento
router.delete('/:id', eliminarEvento );


module.exports = router;