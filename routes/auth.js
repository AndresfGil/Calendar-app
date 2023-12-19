const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt')

const { addUser, loginUser, revalidarToken } = require('../controllers/auth')


router.post(
    "/new", 
    [// middlewares

        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    addUser );

router.post(
    "/",
    [// middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser );

router.get("/renew", validarJWT, revalidarToken );

module.exports = router;