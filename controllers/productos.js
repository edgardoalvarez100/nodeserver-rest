const { response } = require("express");
const { Producto } = require("../models");

const productosGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({ total, productos });
};

const productoById = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
  .populate("usuario", "nombre")
  .populate("categoria","nombre");

  res.json(producto);
};

const productoPost = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({nombre: body.nombre });
  if (productoDB) {
    return res.status(400).json({ msg: `La producto ${nombre}, ya existe` });
  }

  //generar la data a guardar
  const data = {
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
    categoria : body.categoria,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(201).json({ producto });
};

const productoPut = async (req, res = response) => {
  const { id } = req.params;
  const {estado, usuario, ...data} = req.body;

  if(data.nombre ){
      data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data,{new: true});

  res.json(producto);
};

const productoDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrado logico
  const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false });
  res.json(productoBorrado);
};

module.exports = {
  productosGet,
  productoById,
  productoPost,
  productoPut,
  productoDelete,
};
