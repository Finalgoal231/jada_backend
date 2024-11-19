/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("email").unique();
    table.string("fullname");
    table.string("password");
    table.boolean("email_verified").defaultTo(false);
    table.string("otp_base32");
    table.string("otp_auth_url");
    table.boolean("otp_enabled").defaultTo(false);
    table.boolean("otp_verified").defaultTo(false);
    table.string("avatar").defaultTo("01.jpg");
    table.dateTime("email_verified_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
