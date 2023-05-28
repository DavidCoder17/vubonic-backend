const express = require('express')
const cors = require('cors')
const path = require('path')

const { dbConnection } = require('../db/dbConnection')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.middlewares()
        this.dbConnect()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    dbConnect(){
        dbConnection()
    }

    routes(){
        //this.app.use(require('../routes/render.routes'))
        this.app.use('/api/auth',require('../routes/auth.routes'))
    }

    listen(){
        this.app.listen(this.port,()=> console.log('Server running on port ' + this.port))
    }

}

module.exports = Server;