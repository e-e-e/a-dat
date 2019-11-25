const makers = require("./data/makers");
const uploads = require("./data/uploads");
const things = require("./data/things");
const collections = require("./data/collections");

async function setupDatabase(db) {
  await db.collection("maker").insertMany(makers.makers);
  await db.collection("upload").insertMany(uploads.uploads);
  await db.collection("thing").insertMany(things.things);
  await db.collection("collection").insertMany(collections.collections);
}

async function clearDatabase(db) {
  await db.collection("maker").deleteMany({});
  await db.collection("upload").deleteMany({});
  await db.collection("thing").deleteMany({});
  await db.collection("collection").deleteMany({});
}

module.exports = { setup: setupDatabase, clear: clearDatabase };
