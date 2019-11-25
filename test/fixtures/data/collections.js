const { ObjectID } = require("mongodb");
const { allAboutLove, redDoc } = require("./things");

let id_count = 0;

function createCollection(data) {
  return {
    _id: new ObjectID(id_count++),
    things: data.things.map(t => ({
      thing: t._id
    }))
  };
}

const greatBooks = createCollection({
  name: "great books",
  things: [allAboutLove, redDoc]
});

module.exports = {
  collections: [greatBooks],
  greatBooks
};
