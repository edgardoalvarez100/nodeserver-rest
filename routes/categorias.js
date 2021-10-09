const { Router } = require("express");
const { check } = require("express-validator");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const {
  categoriasGet,
  categoriaById,
  categoriaPost,
  categoriaPut,
  categoriaDelete,
} = require("../controllers/categorias");

const {
  validarCampos,
  tieneRole,
  validarJWT,
  esAdminRole,
} = require("../middlewares");

const router = Router();

router.get("/", categoriasGet);
router.get("/:id", [
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeCategoriaPorId),
  validarCampos,
], categoriaById);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").notEmpty(),
    validarCampos,
  ],
  categoriaPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    // check("rol").custom(esRolValido),
    validarCampos,
  ],
  categoriaPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    // esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  categoriaDelete
);

module.exports = router;
