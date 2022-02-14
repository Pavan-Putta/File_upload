const collection = require('../utilities/fileDataConnection');
const createError = require('http-errors');

let file = {}

file.uploadFileData = async (fData) =>{
    const fileDataColl = await collection.getCollection();
    const files = await fileDataColl.find({ _id: fData._id });
    if(files.length === 0){
        const data = await fileDataColl.create(fData);
        if(data){
           return data.fileData;
        }else{
          const err = createError(401,"Unable upload the details!!");
          throw err;
        }
    }else {
        const data = await fileDataColl.updateOne({_id: fData._id},{$push: {fileData: {$each: fData.fileData} } });
        if(data.modifiedCount){
           return data;
        }else{
          const err = createError(401,"Unable upload the details!!");
          throw err;
        }
    }      
}

file.getData = async (uEmail) =>{
  const fileDataColl = await collection.getCollection();
  const files = await fileDataColl.find({ _id: uEmail });
  if (files.length === 1) {
    return files[0].fileData;
  }else{
    const err = createError(404,"No file uploaded yet, please upload a Json file!!");
    throw err;
  }
}

module.exports = file