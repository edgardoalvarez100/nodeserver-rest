const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/login',[
    
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatoria').notEmpty(),
    validarCampos
],login);


module.exports = router;