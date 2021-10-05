
const express = require("express");
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        this.routes();
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/usuarios'));
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