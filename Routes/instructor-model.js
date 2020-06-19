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

function updateclass(updateclass, id) {
  // console.log(nwclass);
  return db("class")
    .where({ id: id })
    .first()
    .update(updateclass)
    .then(() => {
      return db("class").where({ id: id });
    });
}

function deleteclass(id) {
  // console.log(nwclass);
  return db("class")
    .where({ id: id })
    .then((removedClass) => {
      return db("class")
        .where({ id: id })
        .first()
        .del()
        .then(() => {
          return removedClass;
        });
    });
}

module.exports = {
  findAllInstructor,
  findInstructorById,
  findInstructorClassesById,
  findInstructorByEmail,
  addInstructor,
  createclass,
  updateclass,
  deleteclass,
};
