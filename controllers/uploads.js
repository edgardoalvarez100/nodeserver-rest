const { response } = require("express");
const path = require("path")

 const cargarArchivo = (req,res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No hay archivos para subir'});
    return;
  }


  const { archivo } = req.files;

  const extensionValida  = ["jpg","png","jpeg","gif"];
  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  if(!extensionValida.includes(extension)){
    return res.status(400).json({msg:`La extension ${extension}, no esta permitada; permitidas: ${extensionValida}`})
  }

  const uploadPath = path.join(__dirname, '../uploads/',archivo.name);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({msg:err});
    }

    res.json({msg:'File uploaded to ' + uploadPath});
  });

 }

 module.exports = {cargarArchivo}