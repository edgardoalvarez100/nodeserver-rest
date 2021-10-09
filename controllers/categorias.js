const {response} = require('express');
const { Categoria } = require('../models');

const categoriasGet = async(req, res= response) => {
    const {limite= 5, desde=0 } = req.query;
    const query = {estado :true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({total,categorias});
}

const categoriaById = async(req, res= response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate("usuario","nombre");
    
    res.json(categoria);
}

const categoriaPost = async (req, res= response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({msg: `La categoria ${nombre}, ya existe`})
    }

    //generar la data a guardar
    const data = {
        nombre, usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({categoria})
}
const categoriaPut = async(req, res= response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
  
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data,{new: true});
  
    res.json(categoria);

}
const categoriaDelete = async(req, res= response) => {
    const {id} = req.params;

    //Borrado logico
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});
    res.json(categoria);
}



module.exports = {categoriasGet, categoriaById, categoriaPost, categoriaPut, categoriaDelete}