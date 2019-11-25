const { Collections } = require("./collections");
const { Makers } = require("./makers");
const { Things } = require("./things");
const { Uploads } = require("./uploads");

module.exports = {
  create: db => ({
    collections: new Collections(db),
    makers: new Makers(db),
    things: new Things(db),
    uploads: new Uploads(db)
  })
};
