const db = require("../database/db-config.js");

function findAllInstructor() {
  return db("instructor");
}

function findInstructorById(id) {
  return db("instructor").where({ id: id });
}

function findInstructorClassesById(id) {
  return db("class").where({ instructor_id: id });
}

function findInstructorByEmail(email) {
  return db("instructor").where({ email: email });
}
function addInstructor(instructor) {
  return db("instructor").insert(instructor);
}
function createclass(nwclass) {
  // console.log(nwclass);
  return db("class").insert(nwclass);
}

module.exports = {
  findAllInstructor,
  findInstructorById,
  findInstructorClassesById,
  findInstructorByEmail,
  addInstructor,
  createclass,
};
