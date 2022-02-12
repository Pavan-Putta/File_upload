const dbLayer = require('../model/fileDataModel');

let file = {}

file.uploadFile = (fData) =>{
  return dbLayer.uploadFileData(fData).then(ele =>{
    return ele;
  })
}


module.exports = file