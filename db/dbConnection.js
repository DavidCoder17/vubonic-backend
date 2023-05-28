const { connect } = require('mongoose')

const dbConnection = async()=>{

    try {
        
        await connect(process.env.MONGO_CNN)
        console.log('Connected to the database');

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    dbConnection
}