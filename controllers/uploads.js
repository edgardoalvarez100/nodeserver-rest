const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { Usuario, Producto } = require("../models");
const { fstat } = require("fs");

const cargarArchivo = async (req, res = response) => {
  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({ msg: "No hay archivos para subir" });
  //   return;
  // }

  try {
    // const nombreArchivo = await subirArchivo(req.files, ["txt","md"],'textos');
    const nombreArchivo = await subirArchivo(req.files, undefined, "imgs");
    res.json({ archivo: nombreArchivo });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  try {
    //limpiar imagenes previas
    if (modelo.img) {
      const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        await fs.unlinkSync(pathImg);
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }

  const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombreArchivo;
  await modelo.save();
  res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  try {
    //limpiar imagenes previas
    if (modelo.img) {
      const nombreCortado = modelo.img.split("/");
      const nombre = nombreCortado[nombreCortado.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader(tempFilePath);

  modelo.img = secure_url;
  await modelo.save();
  res.json(modelo);
};

const mostrarImage = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  try {
    //limpiar imagenes previas
    if (modelo.img) {
      const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }

  res.json({ msg: "falta place holder" });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImage,
  actualizarImagenCloudinary,
};
