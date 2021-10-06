const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require("../controllers/usuarios");

const router = Router();

router.get('/',usuariosGet);
router.post('/',[check('correo','El correo no es valido').isEmail()],usuariosPost);
router.put('/:id',usuariosPut);
router.delete('/:id',usuariosDelete);
router.patch('/',usuariosPatch);


module.exports = router;