const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); // true or false
  //busqueda por ID
  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({ results: usuario ? [usuario] : [] });
  }

  //busqueda por nombre
  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  return res.json({ results: usuarios });
};

const buscarProductos = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino); // true or false
    //busqueda por ID
    if (esMongoId) {
      const producto = await Producto.findById(termino)
      .populate("categoria","nombre")
      .populate("usuario","nombre");
      return res.json({ results: producto ? [producto] : [] });
    }
  
    //busqueda por nombre
    const regex = new RegExp(termino, "i");
    const productos = await Producto.find({nombre: regex, estado: true})
    .populate("categoria","nombre")
      .populate("usuario","nombre");;
    return res.json({ results: productos });
  };

  const buscarCategorias = async (termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino); // true or false
    //busqueda por ID
    if (esMongoId) {
      const categoria = await Categoria.findById(termino);
      return res.json({ results: categoria ? [categoria] : [] });
    }
  
    //busqueda por nombre
    const regex = new RegExp(termino, "i");
    const categorias = await Categoria.find({nombre: regex, estado: true});
    return res.json({ results: categorias });
  };


const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res
      .status(400)
      .json({
        msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
      });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    
  }
};

module.exports = { buscar };
