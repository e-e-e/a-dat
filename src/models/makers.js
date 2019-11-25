class Makers {
  constructor(db) {
    this.db = db;
  }

  async get(id) {
    if (Array.isArray(id)) {
      return this.db
        .collection("maker")
        .find({ _id: { $in: id } })
        .toArray();
    }
    return this.db.collection("maker").find({ _id: id });
  }
}

module.exports = { Makers };
