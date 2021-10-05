const {response} = require('express');

const usuariosGet = (req,res= response)=>{
    const {page=1,q,nombre,limite=10} = req.query;

    res.json({msg: 'get API - controlador',q,page,nombre,limite});
};


const usuariosPost = (req,res= response)=>{
    const {nombre, edad } = req.body;
    res.json({msg: 'Post API - controlador',nombre,edad});
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