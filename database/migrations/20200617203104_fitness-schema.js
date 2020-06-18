exports.up = function (knex) {
  return knex.schema
    .createTable("client", (tbl) => {
      tbl.increments("id");
      tbl.string("name", 128).notNullable();
      tbl.string("email", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
      tbl.string("phone_number", 128);
      tbl.integer("role_id", 128).notNullable().defaultTo(1);
    })
    .createTable("instructor", (tbl) => {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl.string("email").notNullable().unique();
      tbl.string("password", 128).notNullable();
      tbl.integer("role_id", 128).notNullable().defaultTo(1);
    })
    .createTable("class", (tbl) => {
      tbl.increments("id");
      tbl.string("class_name").notNullable();
      tbl.string("type").notNullable();
      tbl.string("start_time").notNullable();
      tbl.string("start_date").notNullable();
      tbl.string("duration").notNullable();
      tbl.string("intensity_level").notNullable();
      tbl.string("location").notNullable();
      tbl.integer("registered_attendees").defaultTo(0);
      tbl.integer("class_size").notNullable();
      tbl
        .integer("instructor_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("instructor")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("client_class", (tbl) => {
      tbl
        .integer("client_id")
        .notNullable()
        .unsigned()
        .references("client.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("class_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("class")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["client_id", "class_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("client_class")
    .dropTableIfExists("class")
    .dropTableIfExists("instructor")
    .dropTableIfExists("client");
};
