class Uploads {
  constructor(db) {
    this.db = db;
  }

  async get(id) {
    if (Array.isArray(id)) {
      return this.db
        .collection("upload")
        .find({ _id: { $in: id } })
        .toArray();
    }
    return this.db.collection("upload").findOne({ _id: id });
  }
}

module.exports = { Uploads };
