const express = require('express');
const routing = express.Router();
const userService = require('../service/users');
const fileService = require('../service/fileDataService');


//To verify the credentials of user
routing.post('/login', (req, res, next) => {
  const uEmail = req.body.uEmail;
  const uPass = req.body.uPass;
  console.log(req.body)
  return userService.loginUser(uEmail, uPass).then(item => {
    res.json({ data: item });
  }).catch(err => {
    next(err);
  });
});

routing.post('/register', (req,res,next) => {
     const uData = req.body;
    //  console.log(uData);
     return userService.registerUser(uData).then( ele => 
       res.json({data : ele})       
     ).catch(err => next(err))
});


//To save the file data uploaded by user
routing.post('/fileUpload',(req,res,next) => {
  const fileData = req.body;
  //  console.log(fileData);
  return fileService.uploadFile(fileData).then(ele => 
    res.json({data : ele})       
  ).catch(err => next(err))

});

module.exports = routing