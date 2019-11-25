#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();

// CREATE
program
  .command("create <collection> [otherCollections...]")
  .description(
    "Create new dats for specified collections, if they do not already exist."
  )
  .action(function(collection, otherCollections) {
    console.log(collection, otherCollections);
  });

// UPDATE
program
  .command("update [collections...]")
  .description(
    "Sync dats with current database state. If no collections are specified will attempt to update the state of all collections."
  )
  .action(function(collections) {
    console.log(collections);
  });

// SHARE
program
  .command("share [collections...]")
  .description(
    "Share specified collections via Dat. If no collection is specified it will share all collections."
  )
  .action(function(collections) {
    console.log(collections);
  });
// INIT
program
  .command("init")
  .description("Create new configuration file")
  .action(() => {
    console.log("--init");
  });

program.parse(process.argv);
