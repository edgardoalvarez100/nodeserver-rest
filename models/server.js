
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

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
        this.app.use('/api/uploads', require('../routes/uploads'));
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
        //RATE LIMIT
        this.app.use(rateLimit({
            windowMs: 15  * 1000, // 15 seg
            max: 30// limit each IP to 30 requests per windowMs
          }));

        //CORS
        this.app.use(cors());

        //Lectura y paseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static("public"));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

       
    }
}

module.exports = Server;