const db = require("../database/db-config.js");

function findAllClient() {
  return db("client");
}

function findClientById(id) {
  return db("client").where({ id: id });
}
function findClientClassById(id) {
  return db("client_class as cl")
    .join("class as c", "cl.class_id", "c.id")
    .select("c.*")
    .where("cl.client_id", id);
}

function findClientByEmail(email) {
  return db("client").where({ email: email });
}
function addClient(client) {
  return db("client").insert(client);
}
function enrollclass(enrollmentinfo) {
  return db("client_class").insert(enrollmentinfo);
}
function findAllClientClass() {
  return db("class as c")
    .join("instructor as i", "c.instructor_id", "i.id")
    .select("c.*", "i.name as instructor_name");
}

function findClassById(id) {
  return db("class").where({ id: id });
}

function deleteclass(id, cid) {
  // console.log(nwclass);
  return db("client_class")
    .where({ client_id: id, class_id: cid })
    .first()
    .del();
}

module.exports = {
  findAllClient,
  findClientByEmail,
  findClassById,
  addClient,
  findAllClientClass,
  findClientById,
  findClientClassById,
  enrollclass,
  deleteclass,
};
