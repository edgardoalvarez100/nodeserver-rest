const { request, response } = require("express")


const esAdminRole = (req = request,res= response,next) => {
    
    if(!req.usuario){
        return res.status(500).json({msg: 'se quiere verificar el role sin validar primero el token'});
    }

    const {rol,nombre} = req.usuario;
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({msg:`${nombre} no tiene permisos de Administrador`})
    }

}


module.exports = {esAdminRole}