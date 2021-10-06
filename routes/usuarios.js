const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require("../controllers/usuarios");
const { esRolValido, existeEmail } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/',usuariosGet);
router.post('/',[
    check('nombre','El nombre es requerido').notEmpty(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol','No es un rol valido').isIn(["ADMIN_ROLE","USER_ROLE"]),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost);
router.put('/:id',usuariosPut);
router.delete('/:id',usuariosDelete);
router.patch('/',usuariosPatch);


module.exports = router;