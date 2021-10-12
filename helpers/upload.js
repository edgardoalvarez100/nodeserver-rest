const path = require("path");
const { v4: uuidv4 } = require("uuid");


const subirArchivo = async(files, extensionValida = ["jpg", "png", "jpeg", "gif"], carpeta = '') => {
    return new Promise((resolve,reject)=>{
        const { archivo } = files;
       
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];
      
        if (!extensionValida.includes(extension)) {
            return reject(`La extension ${extension}, no esta permitada; permitidas: ${extensionValida}`);
        }
      
        const tempName = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, "../uploads/", carpeta ,tempName);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);
          }
          resolve(tempName)
        });
    });

  
};




module.exports = {
  subirArchivo,
};
