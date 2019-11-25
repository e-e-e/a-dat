const { ObjectID } = require("mongodb");
const { bellHooks, anneCarson } = require("./makers");
const { bellHooksEpub, bellHooksPdf, anneCarsonPdf } = require("./uploads");

let id_count = 0;

function createThing(data) {
  return {
    _id: new ObjectID(id_count++),
    title: data.title,
    makers: data.makers.map((m, i) => ({
      maker: m._id,
      role: (data.roles && data.roles[i]) || ""
    })),
    files: data.files.map(f => f._id)
  };
}

const allAboutLove = createThing({
  title: "All about love.",
  makers: [bellHooks],
  files: [bellHooksEpub, bellHooksPdf]
});

const redDoc = createThing({
  title: "red:Doc",
  makers: [anneCarson],
  files: [anneCarsonPdf]
});

module.exports = {
  things: [allAboutLove, redDoc],
  allAboutLove,
  redDoc
};
