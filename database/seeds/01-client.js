exports.seed = function (knex) {
  return knex("client").insert([
    {
      name: "Earl Hubbard",
      email: "EarlKHubbard@jourrapide.com",
      password: "123",
      phone_number: "540-974-2579",
    },
    {
      name: "Steve Pressley",
      email: "SteveSPressley@dayrep.com",
      password: "123",
      phone_number: "303-292-2057",
    },
    {
      name: "Paul Cornell Pressley",
      email: "PaulMCornell@rhyta.com",
      password: "123",
      phone_number: "843-280-7332",
    },
  ]);
};
