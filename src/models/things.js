class Things {
  constructor(db) {
    this.db = db;
  }

  async get(id) {
    if (Array.isArray(id)) {
      return this.db
        .collection("thing")
        .find({ _id: { $in: id } })
        .toArray();
    }
    return this.db.collection("thing").findOne({ _id: id });
  }
}

module.exports = { Things };
