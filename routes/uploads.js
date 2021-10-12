const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");


const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.post("/", cargarArchivo);

router.put("/:coleccion/:id", [],actualizarImagen);


module.exports = router;