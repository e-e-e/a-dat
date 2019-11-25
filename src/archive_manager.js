class ArchiveManager {
  async create(id) {
    // check if archive does not already exists
    // if it exists, throw error
    // else find collection in db
    // import all files
    // create metadata for the collection
  }

  async update(id) {
    // find existing archive with id
    // if not found - throw
    // else sync with any changes that the current
  }

  async share() {}
}

async function createArchiveManager(config) {
  const { database, close } = await createDatabase(config.database);
  const models = models.create(database);

  return new ArchiveManager();
}

module.exports = {
  createArchiveManager
};
