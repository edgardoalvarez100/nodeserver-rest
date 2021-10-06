const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");

const usuariosGet = (req,res= response)=>{
    const {page=1,q,nombre,limite=10} = req.query;

    res.json({msg: 'get API - controlador',q,page,nombre,limite});
};


const usuariosPost = async(req,res= response)=>{
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario( {nombre,correo,password,rol});

    //validar si existe ya el correo

    //encriptar contraseña
    const salt =  bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.json({usuario});
};

const usuariosPut = (req,res= response)=>{
    const id = req.params.id;
    res.json({msg: 'put API - controlador',id});
};
const usuariosPatch = (req,res= response)=>{
    res.json({msg: 'patch API - controlador'});
};
const usuariosDelete = (req,res= response)=>{
    res.json({msg: 'delete API - controlador'});
};

module.exports = {usuariosGet,usuariosDelete,usuariosPatch,usuariosPost,usuariosPut};