module.exports = {
  infoIsValidClient,
  infoIsValidClientSignin,
  infoIsValidInstructor,
  infoIsValidInstructorSignin,
};

function infoIsValidClient(user) {
  return Boolean(
    user.name &&
      user.email &&
      user.password &&
      typeof user.password === "string"
  );
}

function infoIsValidClientSignin(user) {
  return Boolean(
    user.email && user.password && typeof user.password === "string"
  );
}

function infoIsValidInstructor(user) {
  return Boolean(
    user.name &&
      user.email &&
      user.role_id &&
      user.password &&
      typeof user.password === "string" &&
      user.role_id == (process.env.ROLE_ID || 123)
  );
}

function infoIsValidInstructorSignin(user) {
  return Boolean(
    user.email && user.password && typeof user.password === "string"
  );
}
