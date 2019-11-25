const { CollectionData } = require("../src/collection_data");
const { createDatabase } = require("../src/database");
const models = require("../src/models");
const databaseFixture = require("./fixtures/database");
const { greatBooks } = require("./fixtures/data/collections");

describe("CollectionData", () => {
  let collection;
  let db;
  let closeDatabase;
  beforeAll(async () => {
    const { database, close } = await createDatabase({
      // url: "mongodb://localhost:27017",
      url: process.env.MONGO_URL,
      name: "testing"
    });
    db = database;
    closeDatabase = close;
  });

  beforeEach(async () => {
    await databaseFixture.setup(db);
    collection = new CollectionData(models.create(db));
  });

  afterEach(async () => {
    await databaseFixture.clear(db);
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("files", () => {
    it("returns a map of files", async () => {
      //TODO: write a real test
      await collection.files(greatBooks._id);
    });
  });
});
