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
function findAllClientClass() {
  return db("class as c")
    .join("instructor as i", "c.instructor_id", "i.id")
    .select("c.*", "i.name as instructor_name");
}

module.exports = {
  findAllClient,
  findClientByEmail,
  addClient,
  findAllClientClass,
};
