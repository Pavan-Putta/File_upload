const dbLayer = require('../model/users');

let user = {}

//Verfying the credentials of user
user.loginUser = (uEmail, pass) => {
  return dbLayer.userLogin(uEmail, pass).then(response => {
    return response
  })
}
//Verifying whether the user exits
user.registerUser = (uData)=> {
  return dbLayer.userRegister(uData).then(ele => {
    return ele
  })
}

//Testing service
user.test = () => {
  return "OK!"
}

module.exports = user