const {response} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async(req, res= response) => {

    const {correo, password } = req.body;

    try {
        
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({msg:'Correo / Password no son correctos - correo'});
        }
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({msg:'Correo / Password no son correctos - estado:false'});
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({msg:'Correo / Password no son correctos - password'});
        }
        //generar el JWT

    } catch (error) {
        console.log(error);
        return res.status(500).json({"msg":"hable con el admininistrador"});
    }

     res.json({
        "msg": "login"
     });
}

module.exports = {login}