const { ObjectID } = require("mongodb");

let id_count = 0;
function createUpload(data) {
  return {
    _id: new ObjectID(id_count++),
    file_name: data.name,
    file_path: data.path
  };
}

const bellHooksEpub = createUpload({
  name: "all about love.epub",
  path: "project/bell-hooks/all-about-love/all about love.epub"
});
const bellHooksPdf = createUpload({
  name: "all about love.pdf",
  path: "project/bell-hooks/all-about-love/all about love.pdf"
});
const anneCarsonPdf = createUpload({
  name: "redDoc.pdf",
  path: "project/anne/redDoc/redDoc.pdf"
});

module.exports = {
  uploads: [bellHooksEpub, bellHooksPdf, anneCarsonPdf],
  bellHooksPdf,
  bellHooksEpub,
  anneCarsonPdf
};
