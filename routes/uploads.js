const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/uploads");


const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.post("/", cargarArchivo);


module.exports = router;