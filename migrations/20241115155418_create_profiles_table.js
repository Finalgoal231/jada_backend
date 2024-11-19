/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("leads", (table) => {
    table.string("id").primary();
    table.string("email").unique();
    table.string("company_name");
    table.string("customer_name");
    table.string("profile_picture");
    table.string("page_title");
    table.string("button_one_text");
    table.string("button_two_text");
    table.string("video_link");
    table.string("video_title");
    table.string("status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("leads");
};
