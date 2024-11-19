import knexfile from "../../knexfile";
import knexConnect from "knex";

export const knex = knexConnect(knexfile.development);
