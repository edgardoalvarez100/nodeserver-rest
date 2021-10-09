
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //conectar a DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        this.routes();
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/buscar', require('../routes/buscar'));
        this.app.use('/api/categorias', require('../routes/categorias'));
        this.app.use('/api/productos', require('../routes/productos'));
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    async connectDB(){
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en puerto "+ process.env.PORT)
        });
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y paseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static("public"));
    }
}

module.exports = Server;