exports.seed = function (knex) {
  return knex("client_class").insert([
    {
      client_id: 1,
      class_id: 2,
    },
    {
      client_id: 1,
      class_id: 1,
    },
    {
      client_id: 2,
      class_id: 2,
    },
    {
      client_id: 3,
      class_id: 3,
    },
    {
      client_id: 3,
      class_id: 1,
    },
    {
      client_id: 3,
      class_id: 2,
    },
  ]);
};
