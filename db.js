const { MongoClient } = require('mongodb');
const mongodbUrl = 'mongodb://192.168.233.128:27017/psychic';
let client;

async function dbConnect() {
  if (!client) {
    client = await MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });  
  }

  // 在事务中执行操作
  const session = client.startSession();

  return {
    collection: name => client.db().collection(name),
    command: async cmdObj => await client.db().command(cmdObj),
    startTransaction: async () => await session.startTransaction()
  };
}

module.exports = dbConnect;


