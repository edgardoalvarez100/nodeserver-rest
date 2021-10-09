const { Router } = require("express");
const { check } = require("express-validator");
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");
const {
  productosGet,
  productoById,
  productoPost,
  productoPut,
  productoDelete,
} = require("../controllers/productos");

const {
  validarCampos,
  tieneRole,
  validarJWT,
  esAdminRole,
} = require("../middlewares");

const router = Router();

router.get("/", productosGet);
router.get("/:id", [
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeProductoPorId),
  validarCampos,
], productoById);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").notEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  productoPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    // check("rol").custom(esRolValido),
    validarCampos,
  ],
  productoPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    // esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoDelete
);

module.exports = router;
