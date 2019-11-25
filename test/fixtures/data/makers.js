const { ObjectID } = require("mongodb");

let id_count = 0;

function makeMaker(data) {
  return {
    _id: new ObjectID(id_count++),
    name: {
      title: data.title,
      first: data.first,
      middle: data.middle,
      last: data.last,
      suffix: data.suffix
    }
  };
}

const anneCarson = makeMaker({ first: "Anne", last: "Carson" });
const bellHooks = makeMaker({ first: "bell", last: "hooks" });

module.exports = {
  makers: [anneCarson, bellHooks],
  anneCarson,
  bellHooks
};
