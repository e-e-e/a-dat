const { createDatabase } = require("./database");
const models = require("./models");

const DIR_MAX_LENGTH = 256;

function trunc(str, len) {
  if (str <= len) return str;
  return len <= 3 ? str.substring(0, len) : str.substring(0, len - 3) + "...";
}

function makersToAuthorsString(makers) {
  // TODO: consider roles
  // TODO: consider when names are missing
  // TODO: escape commas and slashes
  const authors = makers.map(m =>
    `${m.name.last},${m.name.first} ${m.name.middle}`.trim()
  );
  let string = "";
  for (let author of authors) {
    if (string.length + author.length + 1 >= DIR_MAX_LENGTH) {
      //TODO: gracefully degrade
      return string + "+" || trunc(author, DIR_MAX_LENGTH - 1) + "+";
    }
    if (string.length > 0) string += ";";
    string += author;
  }
  return string;
}

function parseAuthorString(str) {
  const authors = str.split(";");
  authors.map(author => {
    const segments = author.split(",");
    // TODO: unescape commas and slashes
    return {
      first: segments[0],
      last: segments[1]
    };
  });
}

class CollectionData {
  constructor(models) {
    this.models = models;
  }

  /**
   * Fetch metadata for collection
   */
  async metadata(id) {}

  /**
   * Get all files from the collection
   */
  async files(id) {
    const { collections, things, makers, uploads } = this.models;
    // fetch collection data
    const collection = await collections.get(id);
    if (!collection) return null;
    const map = {};
    for (const thing of collection.things) {
      const item = await things.get(thing.thing);
      const people = await makers.get(item.makers.map(m => m.maker));
      const files = await uploads.get(item.files);
      const authorString = makersToAuthorsString(people);
      // console.log(files);
      // break;
      for (const file of files) {
        const filename = `${authorString}/${item.title}/${file.file_name}`;
        // console.log("-", filename);
        map[filename] = file.file_path;
      }
    }
    console.log(map);
    return map;
  }

  async resolve(id, filename) {
    const segments = filename.split("/");
    return "tear apart name and find corresponding file.";
  }
}

async function createCollectionData(config) {
  const { database, close } = await createDatabase(config.database);
  const m = models.create(database);
  return new CollectionData(m);
}

module.exports = {
  createCollectionData,
  CollectionData
};
