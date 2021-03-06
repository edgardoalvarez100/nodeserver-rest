const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImage, actualizarImagenCloudinary } = require("../controllers/uploads");


const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();


router.post("/", validarArchivoSubir,cargarArchivo);

router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check("id","El id debe ser valido").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos

],actualizarImagenCloudinary);


router.get("/:coleccion/:id", [
    check("id","El id debe ser valido").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImage);

module.exports = router;