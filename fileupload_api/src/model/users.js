const createError = require('http-errors');
const collection = require('../utilities/userConnection');
let user = {}
 
//Generating user Id for new users  
user.generateId = () => {
    return collection.getCollection().then(model => {
      return model.distinct("userId").then( uids => {
        let id = 1000;
        if(uids.length){
        id = Number(uids[0].substr(1,4))
        uids.forEach(uid => {
          if(id < Number(uid.substr(1,4)) )
              id = Number(uid.substr(1,4))
        })
      }
        return "U"+(id+1);
      } )
    })
}
 
//Verify the user credentials and modify the last logout
user.userLogin = async (uEmail, uPass) => {
  const userColl = await collection.getCollection();
  const data = await userColl.find({ "uCredentials.uEmail": uEmail });
  if (data.length === 1) {
    if (uPass == data[0]['uCredentials']['uPass']) {
      return userColl.updateOne({ "uCredentials.uEmail": uEmail },
        { $set: { uLastLogin: new Date().toISOString() } }).then(res => {
          if (res.modifiedCount === 1) {
            return data;
          }
        });
    } else {
      const err = createError(401,"The password entered is incorrect!!");
      throw err;
    }
  } else {
    const err_1 = createError(404,"You are not registered.Please register to login");
    throw err_1;
  }
}

//verify and register the user
user.userRegister = async (uData) =>{
  const uColl = await collection.getCollection();
  const data = await uColl.find({ "uCredentials.uEmail": uData.uCredentials.uEmail });
  if(data.length == 0) {
    uData._id = await user.generateId();
    let uin = await uColl.create(uData);
    // console.log(uin)
    if(uin)
      return uData
  }else {
      const err = createError(401,"The email entered exists!! Please login");
      throw err;
  }
}

 
module.exports = user
