const createError = require('http-errors');
const mongoose = require('mongoose');
const  Schema  = mongoose.Schema
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/fileData_DB"

const userSchema = new Schema({
    _id : {type: String, required: [true, 'userId is required']},
    userName : {type: String, required: [true, 'userName is required']},
    uLastLogin : {type: String, default: new Date().toISOString()},
    uCredentials: {
        uEmail: {type: String, required: [true, 'user email is required']},
        uPass: {type: String, required: [true, 'user password is required']}
    }
}, {collection: 'UsersData'})

let createConnection = {}

createConnection.getCollection = () => {
    return mongoose.connect(url).then(database => {
        return database.model('UsersData', userSchema)
      }).catch(error => {
        const err = createError(500,"Could not connect to the database");
        throw err;
      });
}

module.exports = createConnection;