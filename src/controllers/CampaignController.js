import { knex } from "../config/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keys";
const table = "leads";

export const getCampaign = async (req, res) => {
  try {
    const { lead_id } = req.query;
    let campaign;
    if (lead_id) {
      campaign = await knex(table).where("id", lead_id).first();
    } else {
      campaign = await knex(table).select("*");
    }

    return res.json(campaign);
  } catch (error) {
    console.log(error);
  }
};

export const encryptLead = async (req, res) => {
  try {
    const { lead_id } = req.query;
    const {
      id,
      email,
      company_name,
      customer_name,
      profile_picture,
      page_title,
      button_one_text,
      button_two_text,
      video_link,
      video_title,
      status,
    } = await knex(table).where("id", lead_id).first();

    const payload = {
      id,
      email,
      company_name,
      customer_name,
      profile_picture,
      page_title,
      button_one_text,
      button_two_text,
      video_link,
      video_title,
      status,
    };

    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if (err) console.log(err);
      return res.json({ encryptedLead: token });
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const { query } = req.body;

    await knex(table)
      .where("id", lead_id)
      .update({ ...query })
      .then(() => {
        knex(table).where("id", lead_id).first();
      });
    return res.json({ query });
  } catch (error) {
    console.log(error);
  }
};
