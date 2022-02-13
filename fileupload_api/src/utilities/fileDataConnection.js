
const createError = require('http-errors');
const mongoose = require('mongoose');
const  Schema  = mongoose.Schema
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/fileData_DB"

const fileDataSchema = new Schema({
    _id : {type: String, required: [true, 'uEmail is required']},
    fileData: { type: [{
        userId : {type: Number, required: [true, 'user id is required']},
        id : {type: Number, required: [true, 'Id is required']},
        title: {type: String, required: [true, 'Title name is required']},
        body: {type: String, required: [true, 'body data is required']}
    }] }
}, {collection: 'FileData'})

let createConnection = {}

createConnection.getCollection = () => {
    return mongoose.connect(url).then(database => {
        return database.model('FileData', fileDataSchema)
      }).catch(error => {
        const err = createError(500,"Could not connect to the database");
        throw err;
      });
}

module.exports = createConnection;