const Role = require("../models/role");
const { Categoria, Producto, Usuario } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmailDB = await Usuario.findOne({ correo });
  if (existeEmailDB) {
    throw new Error(`El correo ${correo} ya esta registrado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`No existe el ID, ${id} `);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`No existe el ID, ${id} `);
  }

  return true;
};
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`No existe el ID, ${id} `);
  }
  return true;
};

/**
 * validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion= '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`La coleccion ${coleccion}, no es permitida`);
  }

  return true;
}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
};
