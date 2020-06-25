exports.seed = function (knex) {
  return knex("instructor").insert([
    {
      name: "Marlene Moreno",
      email: "MarleneAMoreno@teleworm.us",
      password: "1234",
      role_id: 123,
    },
    {
      name: "Teresa Myers",
      email: "TeresaJMyers@rhyta.com",
      password: "1234",
      role_id: 123,
    },
    {
      name: "Mary D. Gott",
      email: "MaryDGott@dayrep.com",
      password: "1234",
      role_id: 123,
    },
  ]);
};
