const mongodb = require("mongodb");

async function createDatabase(config) {
  const client = mongodb.MongoClient(config.url, { useUnifiedTopology: true });
  await client.connect();
  const database = client.db(config.name);
  return {
    database,
    close: async () => client.close()
  };
}

module.exports = {
  createDatabase
};
