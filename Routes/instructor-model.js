const db = require("../database/db-config.js");

function findAllInstructor() {
  return db("instructor");
}

function findInstructorByEmail(email) {
  return db("instructor").where({ email: email });
}
function addInstructor(instructor) {
  return db("instructor").insert(instructor);
}

module.exports = {
  findAllInstructor,
  findInstructorByEmail,
  addInstructor,
};
