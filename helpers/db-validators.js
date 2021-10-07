
const Role = require("../models/role")
const Usuario = require("../models/usuario")

const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const existeEmail = async(correo = '') => {
    const existeEmailDB = await Usuario.findOne({correo});
    if(existeEmailDB){
        throw new Error(`El correo ${correo} ya esta registrado en la BD`)
    }
} 

const existeUsuarioPorId = async(id) => {
   const existeUsuario =  await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe el ID, ${id} `)
    }
} 

module.exports = {esRolValido,existeEmail,existeUsuarioPorId}