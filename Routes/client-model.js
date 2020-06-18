const db = require("../database/db-config.js");

function findAllClient() {
  return db("client");
}

function findClientByEmail(email) {
  return db("client").where({ email: email });
}
function addClient(client) {
  return db("client").insert(client);
}

module.exports = {
  findAllClient,
  findClientByEmail,
  addClient,
};
