const collection = require('../utilities/fileDataConnection')
const userData = [];
let create = {}

create.setupDB = async () => {
  const fileDataColl = await collection.getCollection();
  const result = await fileDataColl.insertMany(userData);
  if (result && result.length > 0)
    return result.length;
  else
    return null;
}

module.exports = create