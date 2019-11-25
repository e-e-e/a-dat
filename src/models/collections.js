const mongodb = require("mongodb");
class Collections {
  constructor(db) {
    this.db = db;
  }

  async get(id) {
    if (typeof id === "string") {
      id = new mongodb.ObjectId(id);
    }
    return this.db.collection("collection").findOne({ _id: id });
  }

  async findOneWithTitle(title) {
    return db.collection("collections").findOne({
      title
    });
  }
}

module.exports = { Collections };
