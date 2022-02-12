const collection = require('../utilities/fileDataConnection');
const { HttpError } = require("http-errors");

let file = {}

file.uploadFileData = async (fData) =>{
    const fileDataColl = await collection.getCollection();
    const user = await fileDataColl.find({ _id: fData._id });
    if(user.length === 0){
        const data = await fileDataColl.create(fData);
        if(data){
           return data.fileData;
        }else{
          let err = new HttpError("Unable upload the details!!");
            err.status = 401;
            throw err;
        }
    }else {
        const data = await fileDataColl.updateOne({_id: fData._id},{$push: {fileData: {$each: fData.fileData} } });
        if(data.modifiedCount){
           return data;
        }else{
          let err = new HttpError("Unable upload the details!!");
            err.status = 401;
            throw err;
        }
    }
    
   
}

module.exports = file