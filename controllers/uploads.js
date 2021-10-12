const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async(req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos para subir" });
    return;
  }

  try {
    // const nombreArchivo = await subirArchivo(req.files, ["txt","md"],'textos');
    const nombreArchivo = await subirArchivo(req.files, undefined,'imgs');
    res.json({archivo: nombreArchivo });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};


const actualizarImagen = async(req,res = response) => {
    const {id, coleccion }  = req.params;

    res.json({id, coleccion});
}

module.exports = { cargarArchivo, actualizarImagen };